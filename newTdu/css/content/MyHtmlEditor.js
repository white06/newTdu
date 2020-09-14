/// <reference path="kindeditor-4.1.10/kindeditor.js" />
/// <reference path="jquery-1.10.2.js" />
var editor;
$(function () {
    KindEditor.ready(function (K) {
        editor = K.create('#htmlEditor', {
            cssPath: '../Scripts/kindeditor-4.1.10/plugins/code/prettify.css',
            uploadJson: '/../Scripts/kindeditor-4.1.10/asp.net/upload_json.ashx',
            fileManagerJson: '/../Scripts/kindeditor-4.1.10/asp.net/file_manager_json.ashx?subjectid=' + parentwindow.find("#subject option:selected").val(),
            allowFileManager: true,
            extraFileUploadParams: {
                subjectid: parentwindow.find("#subject option:selected").val(),
                knowledgeid: $("#saveTreeNode").val()
            },
            afterUpload: function (url) {
                $.get("/Home/SaveHtmlUploadPhoto", data = { url: url });
            },
            afterCreate: function () { }
        });
    });
});