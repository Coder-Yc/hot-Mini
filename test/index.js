Page({
    data: {
        a: "1",
        fileList: {
            a: [
                "学士学位申请表",
                "https://jwc.gdupt.edu.cn/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1596352495&wbfileid=7728852",
                "2022-03-07",
            ],
            b: [
                "休学申请表",
                "https://jwc.gdupt.edu.cn/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1596352495&wbfileid=7727101",
                "2022-03-07",
            ],
            c: [
                "转专业申请表",
                "https://jwc.gdupt.edu.cn/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1596352495&wbfileid=7727100",
                "2022-03-07",
            ],
            d: [
                "自愿申请留级申请表",
                "https://jwc.gdupt.edu.cn/system/_content/download.jsp?urltype=news.DownloadAttachUrl&owner=1596352495&wbfileid=7727097",
                "2022-03-07",
            ],
        },
    },
    downloadFile(e) {
        let url = e.currentTarget.dataset.src;
        console.log(url);
        wx.downloadFile({
            url,
            success(res) {
                console.log(res);
                if (res.statusCode === 200) {
                    // wx.openDocument({
                    //     filePath: res.tempFilePath,
                    //     fileType: "pdf", // 加上你需要打开的类型不然有些机型打不开报错
                    //     success: function (res) {
                    //         console.log("打开文档成功");
                    //     },
                    //     fail: function (res) {
                    //         console.log(res);
                    //     },
                    // });
                }
            },
        });
    },
});
