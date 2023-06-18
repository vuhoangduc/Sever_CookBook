


const blankTest = (req, res, next) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Lưu ý: getMonth() trả về giá trị từ 0 đến 11
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var formattedTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    const parts = req.url.split('/');
    const getById = parts[1];
    console.log('------------------------------------------------------------');
    console.log('Thời gian truy cập API: ' + formattedTime);
    console.log('người dùng có địa chỉ ' + req.headers['x-forwarded-for'] + ' đang truy cập tới API ' + req.url);
    if (req.method === 'GET'
        &&
        getById != 'getById'
        &&
        req.url != '/'
        &&
        !parts[2] === true
    ) {
        res.json({
            message: 'Bạn không có điều kiện sử dụng api này 8==>'
        })
        return;
    }
    next();
}
module.exports = blankTest;