### 日期表格

> 注意:这是一个JS库，不包含UI

它用于生成如下图的数据结构

<p align="center"><img src="https://raw.githubusercontent.com/loadchange/kalendar/master/preview.png" width="280"></p>


##### 使用方法


1. 安装

    >   有两种方法，

    1. 使用npm; npm install kalendar --save-dev
    2. 直接引用dist\kalendar.js

2. new Kalendar(options)

   options：

   -    startTime: 开始时间 如:'2018-03' 默认当前月
   -    endTime: 结束时间 如:'2018-06' 默认开始时间月份的后三个月
   -    mount: 挂载项 {'2018-03-14': {'festival': '情人节'}}
   -    weekStart: 周几开始 0为周日 1为周一 ，默认为0

   ```

      var kalendar = new Kalendar({
            startTime: '2018-03',
            endTime: '2018-06',
            mount: {
                '2018-03-14': {'festival': '情人节'}
            },
            weekStart: 0
        })

        console.log(kalendar)
    ```

   由Kalendar得到如下对象结构

   <p align="center"><img src="https://raw.githubusercontent.com/loadchange/kalendar/master/output.png" width="800"></p>

3. 内部属性

   每一天的数据以周为单位存放在月份数据的对象下，Day对象中除了挂载了,常用的 年、月、日信息外，
   还有用户挂载的扩展数据和当天的 Date 对象(通过属性：\__DateObject\__获取)

   - \__DateObject\__ : 当天的Date对象
   - year : 年份
   - month: 月份(0-11)
   - date: 日期(1-31)
   - day: 周几(0-6)周日-周六
   - extension: 用户挂载数据
