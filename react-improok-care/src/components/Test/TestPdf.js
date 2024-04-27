import React, { useState } from 'react';
import Apis, { endpoints } from '../../configs/Apis';

function TestPdf() {
    const [pdfUrl, setPdfUrl] = useState(null);

    const fetchPDF = async () => {
        let res = await Apis.get(endpoints['create-pdf'])
        console.log(res.config.baseURL + endpoints['create-pdf'])
        window.open(res.config.baseURL + endpoints['create-pdf'], '_blank'); // Mở tệp
    };

    return (
        <div style={{ marginTop: '10rem' }}>
            <button onClick={fetchPDF}>Hiển thị PDF</button>
        </div>
    );
}

export default TestPdf;
