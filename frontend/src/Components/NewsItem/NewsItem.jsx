import './NewsItem.css';

function NewsItem() {
    return (
        <div className='newsItem'>
            <img
                className='newsItem-image'
                src='https://bizweb.dktcdn.net/thumb/large/100/368/017/articles/tin-tuc.png?v=1739434906810'
                alt=''
            />
            <div className='newsItem-group'>
                <h1 className='newsItem-title'>GỢI Ý CHO CHÀNG: FIRST DATE NÊN MẶC GÌ?</h1>
                <p className='newsItem-detail'>
                    Ấn tượng trong buổi hẹn hò hoặc gặp gỡ đầu tiên rất quan trọng đối với một mối quan hệ. Vì vậy nam
                    giới cần lên kế hoạch cẩn thận nên ăn gì và đi đâu. Hơn hết, mặc gì trong buổi hẹn hò đầu tiên cũng
                    khiến cánh mày râu phải đau đầu. Đừng lo lắng, bài viết này Jan Shop sẽ bật mí ngay gợi ý cách mix
                    đồ cho buổi hẹn hò đầu tiên.
                </p>
            </div>
        </div>
    );
}

export default NewsItem;
