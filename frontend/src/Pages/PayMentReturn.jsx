import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PayMentReturn() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Đang kiểm tra kết quả...');

    useEffect(() => {
        const responseCode = searchParams.get('vnp_ResponseCode');
        if (responseCode === '00') {
            setMessage('✅ Thanh toán thành công!');
        } else {
            setMessage('❌ Thanh toán thất bại hoặc bị hủy.');
        }
    }, [searchParams]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Kết quả thanh toán</h2>
            <p>{message}</p>
            <a href='/'>Quay về trang chủ</a>
        </div>
    );
}

export default PayMentReturn;
