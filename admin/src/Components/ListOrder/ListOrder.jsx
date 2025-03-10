import { useEffect, useState } from 'react';
import './ListOrder.css';

function ListOrder() {
    const [orders, setOrders] = useState([]);

    function formatDate(isoString) {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, '0'); // Giờ 24h
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Phút
        const day = String(date.getDate()).padStart(2, '0'); // Ngày (2 chữ số)
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (2 chữ số)
        const year = date.getFullYear(); // Năm

        return `${hours}:${minutes}\n${day}/${month}/${year}`;
    }

    const updateOrder = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Đã thanh toán' ? 'Chờ thanh toán' : 'Đã thanh toán';

        try {
            const response = await fetch('http://localhost:4000/update-order', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            if (!data.success) throw new Error(data.message);

            await fetchOrder();
            // alert('Cập nhật thành công!');
        } catch (error) {
            alert('Lỗi khi cập nhật: ' + error.message);
        }
    };

    const fetchOrder = async () => {
        await fetch('http://localhost:4000/all-orders')
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            });
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className='order-container'>
            <h2>Danh sách đơn hàng</h2>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã ĐH</th>
                        <th>Tên khách hàng</th>
                        <th>SĐT</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.code}</td>
                            <td>{order.customerName}</td>
                            <td>{order.phone}</td>
                            <td>{order.totalAmount}₫</td>
                            <td>{order.status}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>
                                <button onClick={() => updateOrder(order.id, order.status)}>Cập nhật</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListOrder;
