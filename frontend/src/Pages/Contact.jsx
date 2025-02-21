import './CSS/Contact.css';

function Contact() {
    return (
        <div className='contact'>
            <div className='contact-content'>
                <h1>Liên hệ chúng tôi</h1>
                <p>
                    Shopper là thương hiệu thời trang tiên phong cho xu hướng thời trang Xanh - thời trang bền vững ở
                    Việt Nam, với cam kết ưu tiên lựa chọn và cung cấp các sản phẩm thời trang có nguồn gốc sinh thái,
                    tự nhiên.
                </p>
                <h3>Trụ sở chính</h3>
                <p>14D1, khu phố 1A, đường quốc lộ 1A, phường Tân Thời Hiệp, Quận 12, Thành phố Hồ Chí Minh</p>
                <h3>Điện thoại</h3>
                <p>19009300</p>
                <h3>Email</h3>
                <p>webshopper@gmail.com</p>
            </div>
            <div className='contact-position'>
                <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2880.703713369232!2d-79.41846692530883!3d43.779008844287084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d0deac7139b%3A0x6742f6496df8bd18!2sShoppers%20Drug%20Mart!5e0!3m2!1svi!2s!4v1740060338811!5m2!1svi!2s'
                    width='100%'
                    height='450'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                />
            </div>
        </div>
    );
}

export default Contact;
