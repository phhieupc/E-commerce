import './NewsLetter.css';

function NewsLetter() {
    return (
        <div className='newsletter'>
            <h1>Nhận Ưu Đãi Độc Quyền Qua Email</h1>
            <p>Đăng ký để nhận thông tin khuyến mãi sớm nhất từ Shopper</p>
            <div>
                <input type='email' placeholder='Nhập địa chỉ email' />
                <button>Đăng ký</button>
            </div>
        </div>
    );
}

export default NewsLetter;
