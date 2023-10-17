import React, { FC, useContext, useState } from 'react'
import { Button, Input, Popover, QRCode } from 'antd';
import { useHTTP } from 'src/hooks/useHTTP';
import Search from 'antd/es/input/Search';
import { AuthContext } from 'src/context/authContext';
import { useMessage } from 'src/hooks/useMessage';
import { FloatButton } from 'antd';
import { DownloadOutlined, QrcodeOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type QRCodeEventT = 'download' | 'save';

const CreatePage: FC = () => {
    const navigate = useNavigate();
    const { request } = useHTTP();
    const {messagePopupError, messagePopupSuccess} = useMessage();
    const auth = useContext(AuthContext);
    const [textInput, setTextInput] = useState<string>('');
    const [urlQRCode, setUrlQRCode] = useState<string>('');
    const [textInputPopover, setTextInputPopover] = useState<string>('');
    const [openPopover, setOpenPopover] = useState(false);

    const handleQRCode = async (e: React.MouseEvent, key: QRCodeEventT) => {
        e.stopPropagation()
        const canvas = document.querySelector('.QRCodePicBlock')?.querySelector<HTMLCanvasElement>('canvas');
        switch (key) {
            case 'download':
                if (canvas) {
                    const url = canvas.toDataURL();
                    const a = document.createElement('a');
                    a.download = 'QRCode.png';
                    a.href = url;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
                break;
            case 'save':
                if (!canvas) {
                    messagePopupError('QRCode not generate');
                    return;
                };

                if (!textInputPopover) {
                    messagePopupError('Not entered title for QRCode');
                    return;
                };
                
                if (!urlQRCode) {
                    messagePopupError('Not entered links or QRCode not generate');
                    return;
                };

                try {
                    await request('/api/link/save', 'POST', { url: urlQRCode, qrcode: canvas?.toDataURL(), title: textInputPopover }, {
                        Authorization: `Bearer ${auth?.token}`
                    });
                    setTextInputPopover('');
                    setOpenPopover(false);
                    messagePopupSuccess('QRCode successfully saved')
                } catch (e) {
                    messagePopupError('QRCode not saved');
                };
                break;
        }
    };

    const handleOpenChange = () => {
        setTextInputPopover('');
        setOpenPopover(false);
    };
    
    const navigateOpenChange = () => {
        if (auth?.token) {
            setOpenPopover(true);
        } else {
            navigate('/auth');
            return;
        }
    };

    return (
        <div className='generateQRCodeWrapper'>
            <h1>Generate QRCode</h1>
            <div className='QRCodePicBlock'>
                {urlQRCode ? (
                        <QRCode className='QRCodePic' value={urlQRCode || '-'} bgColor={'#FFF'} size={250} />
                    ) : (
                        <div className='emptyQRCodePic'>QR</div>
                    )
                }
                <FloatButton.Group
                    trigger='click'
                    type='primary'
                    icon={<QrcodeOutlined />}
                >
                    <Popover
                        content={
                            <div className='QRCodePopoverBlock'>
                                <Input onClick={(e) => e.stopPropagation()} value={textInputPopover} placeholder='Enter the title' onChange={(e) => setTextInputPopover(e?.target?.value)}/>
                                <Button type='default' onClick={(e) => handleQRCode(e, 'save')}>Save</Button>
                            </div>
                        }
                        title='Title'
                        trigger='click'
                        placement='rightTop'
                        open={openPopover}
                        onOpenChange={handleOpenChange}
                    >
                        <FloatButton icon={<SaveOutlined />} onClick={navigateOpenChange} tooltip={<div>Save</div>} />
                    </Popover>
                    <FloatButton icon={<DownloadOutlined />} onClick={(e) => handleQRCode(e, 'download')} tooltip={<div>Download</div>} />
                </FloatButton.Group>
            </div>
            <Search
                placeholder='Enter link'
                enterButton='Generate QR'
                allowClear
                value={textInput}
                size='large'
                onChange={(e) => setTextInput(e.target.value)}
                onSearch={() => setUrlQRCode(textInput)}
            />
        </div>
    )
}

export default CreatePage;