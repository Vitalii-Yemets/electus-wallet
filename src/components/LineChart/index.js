import React from 'react'
import * as Recharts from 'recharts'
import './LineChart.css'

const LineChart = ({ dataChart }) => {
    const { AreaChart, Area, XAxis, YAxis, Tooltip } = Recharts
    // const { LineChart, Line, XAxis, YAxis, Tooltip } = Recharts;
    const data = dataChart

    let width = window.innerWidth
    let w = window.innerWidth
    let h = window.innerHeight
    let leftSize = 20

    if (width < 576) {
        w = window.innerWidth
        h = window.innerHeight / 2.5
        leftSize = 0
    } else {
        w = window.innerWidth / 2
        h = window.innerHeight / 2
        leftSize = 20
    }

    return (
        <div className='line-chart'>
            {/* <LineChart
                className={'line-chart-svg'}
                width={w}
                height={h}
                data={data}
                margin={{ top: 5, right: 30, left: leftSize, bottom: 5 }}>
                <XAxis dataKey=" " />
                <YAxis type="number" domain={['dataMin', 'dataMax']} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke="#8884d8" fill='#8884d8' activeDot={{ r: 6 }} />
            </LineChart> */}

            <AreaChart 
               width={w}
               height={h}
               data={data}
               margin={{ top: 5, right: 30, left: leftSize, bottom: 5 }}>
                <XAxis dataKey="" />
                <YAxis ype="number" domain={['dataMin', 'dataMax']}/>
                <Tooltip />
                <Area type='monotone' dataKey='close' stroke='#8884d8' fill='#8884d8' activeDot={{ r: 6 }} />
            </AreaChart>
        </div>
    )
}

export default LineChart
