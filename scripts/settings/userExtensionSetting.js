import { USER } from '../../core/manager.js';

export function renderSetting() {
    $('#st_plot_preference').val(USER.tableBaseSetting.plotPreference || '');
    $('#st_writing_style').val(USER.tableBaseSetting.writingStyle || '');
}

function InitBinging() {
    $('#st_plot_preference').on('input', function () {
        USER.tableBaseSetting.plotPreference = $(this).val();
        USER.saveSettings && USER.saveSettings();
    });

    $('#st_writing_style').on('input', function () {
        USER.tableBaseSetting.writingStyle = $(this).val();
        USER.saveSettings && USER.saveSettings();
    });
}

export function loadSettings() {
    renderSetting();
    InitBinging();
}
