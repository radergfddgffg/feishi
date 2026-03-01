import { APP, USER, SYSTEM, EDITOR } from './core/manager.js';
import { loadSettings } from "./scripts/settings/userExtensionSetting.js";

console.log("______________________预设增强：开始加载______________________")

const VERSION = '2.2.8'

async function onChatCompletionPromptReady(eventData) {
    try {
        if (eventData.dryRun === true) return;

        let promptContent = "";
        if (USER.tableBaseSetting.plotPreference) promptContent += `剧情偏好：${USER.tableBaseSetting.plotPreference}\n`;
        if (USER.tableBaseSetting.writingStyle) promptContent += `文风：${USER.tableBaseSetting.writingStyle}\n`;

        if (promptContent.trim() !== "") {
            // Append as a system message to strongly guide the AI
            eventData.chat.push({ role: 'system', content: `<OOC_SYSTEM_OVERRIDE>\n${promptContent.trim()}\n</OOC_SYSTEM_OVERRIDE>` });
            console.log("注入预设与文风：\n" + promptContent);
        }

    } catch (error) {
        if (EDITOR && EDITOR.error) {
            EDITOR.error(`预设增强：数据注入失败\n原因：`, error.message, error);
        } else {
            console.error(`预设增强：数据注入失败`, error);
        }
    }
}

jQuery(async () => {
    // 应用程序启动时加载设置
    loadSettings();

    // 开始添加各部分的根DOM
    try {
        $('#translation_container').after(await SYSTEM.getTemplate('index'));
    } catch (e) {
        console.warn("Failed to load template index.html:", e);
    }

    try {
        $('#extensions-settings-button').after(await SYSTEM.getTemplate('appHeaderTableDrawer'));
    } catch (e) {
        console.warn("Failed to load template appHeaderTableDrawer.html:", e);
    }

    // 监听主程序事件
    if (APP && APP.eventSource) {
        APP.eventSource.on(APP.event_types.CHAT_COMPLETION_PROMPT_READY, onChatCompletionPromptReady);
    }

    console.log("______________________预设增强：加载完成______________________")
});
