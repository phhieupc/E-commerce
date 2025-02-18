import './DescriptionBox.css';

function DescriptionBox() {
    return (
        <div className='descriptionBox'>
            <div className='descriptionBox-navigator'>
                <div className='descriptionBox-nav-box'>Chi tiết</div>
                <div className='descriptionBox-nav-box fade'>Đánh giá (122)</div>
            </div>
            <div className='descriptionBox-description'>
                <p>
                    Trang web thương mại điện tử là một nền tảng trực tuyến tạo điều kiện thuận lợi cho việc mua và bán
                    sản phẩm hoặc dịch vụ qua internet, đóng vai trò như một thị trường ảo nơi các doanh nghiệp và cá
                    nhân có thể giới thiệu sản phẩm của mình, tương tác với khách hàng và thực hiện giao dịch mà không
                    cần phải có mặt trực tiếp. Các trang web thương mại điện tử đã trở nên vô cùng phổ biến do tính tiện
                    lợi, dễ tiếp cận và phạm vi tiếp cận toàn cầu của ưu đãi.
                </p>
                <p>
                    Các trang web thương mại điện tử thường hiển thị sản phẩm hoặc dịch vụ cùng với mô tả chi tiết, hình
                    ảnh, giá cả và mọi biến thể có sẵn (ví dụ: kích thước, màu sắc). Mỗi sản phẩm thường có thông tin
                    riêng có liên quan.
                </p>
            </div>
        </div>
    );
}

export default DescriptionBox;
