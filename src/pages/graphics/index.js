import { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";
import ReactECharts from "echarts-for-react";
import { Row, Col } from "antd";

const MQTT_URL = "ws://mqtt.connio.cloud:8000/mqtt";
const TOPIC = "SYS";     // örnek uygulama topic
const DEMO = true;       // gerçek veride false yapılır
const MAX = 30;          // grafikte tutulacak nokta sayısı

const PALETTE = {
    purple: "#9A60B4",
    pink: "#EA7CCC",
    blue: "#73C0DE",
};

export default function Graphics() {
    const clientRef = useRef(null);
    const timerRef = useRef(null);

    const [labels, setLabels] = useState([]);
    const [sent, setSent] = useState([]);
    const [recv, setRecv] = useState([]);
    const [drop, setDrop] = useState([]);
    const [maxConnected, setMaxConnected] = useState([]);
    const [connected, setConnected] = useState([]);
    const [rejected, setRejected] = useState([]);

    useEffect(() => {
        const client = mqtt.connect(MQTT_URL, {
            clientId: "_bridge_" + Math.random().toString(16).slice(2, 8),
            username: "burrard",
            password: "burrard",
            clean: true,
            keepalive: 60,
            reconnectPeriod: 2000,
            protocolVersion: 4,
            resubscribe: true,
        });
        clientRef.current = client;

        client.on("connect", () => {
            client.subscribe(TOPIC);

            // DEMO: aynı topic'e her 5 sn'de bir örnek JSON publish ediyor
            if (DEMO && !timerRef.current) {
                timerRef.current = setInterval(() => {
                    const msg = {
                        messageSent: Math.floor(Math.random() * 200),
                        messageReceived: Math.floor(Math.random() * 200),
                        messageDropped: Math.floor(Math.random() * 200),
                        maxConnected: Math.floor(Math.random() * 8) + 8,
                        connected: Math.floor(Math.random() * 8) + 1,
                        rejected: Math.random() < 0.2 ? 1 : 0,
                    };
                    client.publish(TOPIC, JSON.stringify(msg));
                }, 5000);
            }
        });

        client.on("message", (_t, buf) => {
            let d;
            try { d = JSON.parse(buf.toString()); } catch { return; }

            const tick = new Date().toLocaleTimeString();
            setLabels(p => [...p, tick].slice(-MAX));
            setSent(p => [...p, Number(d.messageSent) || 0].slice(-MAX));
            setRecv(p => [...p, Number(d.messageReceived) || 0].slice(-MAX));
            setDrop(p => [...p, Number(d.messageDropped) || 0].slice(-MAX));
            setMaxConnected(p => [...p, Number(d.maxConnected) || 0].slice(-MAX));
            setConnected(p => [...p, Number(d.connected) || 0].slice(-MAX));
            setRejected(p => [...p, Number(d.rejected) || 0].slice(-MAX));
        });

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            try { client.end(true); } catch { }
        };
    }, []);

    const common = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: { backgroundColor: "#eee" }
            }
        },
        grid: {
            left: 48,
            right: 16,
            top: 40,
            bottom: 32
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: labels
        },
        yAxis: {
            type: "value"
        },
    };

    const messagesOption = {
        ...common,
        title: { text: "Messages", left: "2%", top: 6 },
        legend: { data: ["Sent", "Received", "Dropped"], top: 6 },
        color: [PALETTE.purple, PALETTE.pink, PALETTE.blue],
        series: [
            {
                name: "Sent",
                type: "line",
                stack: "total",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: sent
            },
            {
                name: "Received",
                type: "line",
                stack: "total",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: recv
            },
            {
                name: "Dropped",
                type: "line",
                stack: "total",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: drop
            },
        ],
    };

    const clientsOption = {
        ...common,
        title: { text: "Clients", left: "2%", top: 6 },
        legend: { data: ["Max Connected", "Connected", "Rejected"], top: 6 },
        color: [PALETTE.purple, PALETTE.blue, PALETTE.pink],
        series: [
            {
                name: "Max Connected",
                type: "line",
                stack: "clients",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: maxConnected
            },
            {
                name: "Connected",
                type: "line",
                stack: "clients",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: connected
            },
            {
                name: "Rejected",
                type: "line",
                stack: "clients",
                smooth: true,
                areaStyle: { opacity: 0.35 },
                emphasis: { focus: "series" },
                lineStyle: { width: 2 },
                data: rejected
            },
        ],
    };

    return (
        <Row style={{ padding: 16 }} gutter={[16, 16]}>
            <Col xs={24} lg={12}>
                <ReactECharts option={messagesOption} style={{ height: 320 }} />
            </Col>
            <Col xs={24} lg={12}>
                <ReactECharts option={clientsOption} style={{ height: 320 }} />
            </Col>
        </Row>
    );
}

Graphics.pageTitle = "Grafikler";