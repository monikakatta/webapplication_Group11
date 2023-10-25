import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraphView = ({ excelData }) => {
    // Assuming excelData contains data in the format mentioned earlier

    return (
        <div className="bar-container" >

            <h2>Bar Graph Visualization</h2>

            <BarChart
                width={1200}
                height={600}
                data={excelData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#82ca9d" stopOpacity={1} />
                        <stop offset="100%" stopColor="lightpink" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Employee Data" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(excelData[0])
                    .filter((key) => key !== 'Month') // Exclude the X-axis label
                    .map((key, index) => (
                        <Bar key={index} dataKey={key} stackId="a" fill={`url(#colorUv)`} />
                    ))}
            </BarChart>


            <br />

            <br />

            <h3>Salary Comparision Chart</h3>
            <br />
            <BarChart
                width={1200}
                height={400}
                data={excelData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >

                <XAxis dataKey="Employee" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}

                {Object.keys(excelData[0])
                    .filter((key) => key !== 'Employee') // Exclude the X-axis label
                    .map((key, index) => (
                        <Bar
                            key={index}
                            dataKey={key}
                            fill='white'
                        />
                    ))}
            </BarChart>
        </div>
    );
};

export default GraphView;
