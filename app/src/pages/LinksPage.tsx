import { DeleteTwoTone } from '@ant-design/icons';
import { Image, List, Tooltip } from 'antd';
import React, { FC, memo, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from 'src/context/authContext';
import { useHTTP } from 'src/hooks/useHTTP';
import { useMessage } from 'src/hooks/useMessage';

type DataQRCodeType = {
    _id: string;
    title: string;
    url: string;
    qrcode: string;    
    owner: string;
    date: string,
};


const LinksPage: FC = () => {
    const { request, isLoading } = useHTTP();
    const {messagePopupError} = useMessage();
    const {isAuthenticated, token} = useContext(AuthContext);
    const [data, setData] = useState<DataQRCodeType[]>([]);

    const getDataQRCode = useCallback(async () => {
        try {
            const res = await request('/api/link/list', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setData(res)
        } catch (e) {
            messagePopupError('Not possible get data');
        };
    }, []);

    const revomeQRCode = useCallback(async (idLink: string) => {
        try {
            const res = await request('/api/link/delete', 'DELETE', {idLink}, {
                Authorization: `Bearer ${token}`
            });

            setData(data?.filter(l => l._id !== res?._id) || data)
        } catch (e) {
            messagePopupError('Not possible get data');
        };
    }, [data]);

    useEffect(() => {
        isAuthenticated && getDataQRCode();
    }, [isAuthenticated])

    const getDate = (date: string) => {
        const year = date.split('T')
        const time = year?.[1].split('.')
        return `${year?.[0]} / ${time?.[0]}`
    };

    return (
        <div className='linksListQRCodeWrapper'>
            <h1>Links list QRCode</h1>
            {isAuthenticated ? (
                <div className='linksListQRCodeAuthBlock'>
                    <List
                        loading={isLoading}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Image width={150} src={item?.qrcode} />}
                                    title={
                                        <div>
                                            <strong>{item?.title}</strong>
                                            <span className='timeLink'>{getDate(item?.date)}</span>
                                            <Tooltip title='Remove QRCode' placement='topLeft'>
                                                <DeleteTwoTone twoToneColor={'#00b96b'} onClick={() => revomeQRCode(item?._id)}/>
                                            </Tooltip>
                                        </div>
                                    }
                                    description={item?.url}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <div className='linksListQRCodeNotAuthBlock'>
                    <p>To display QR Code you need to log in</p>
                </div>
            )}
        </div>
    )
}

export default memo(LinksPage);