import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpService } from 'src/app/https.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private service: HttpService,) { }

  title = 'scanwich-analytics';
  showGetLastMonthTraffic = false;
  showGetOverallTrafficTrend = false;
  showGetAmountAndOrderInfo = false;
  showGetSupplierAmountAndOrderTrend = false;


  
  getLastMonthTrafficOptionsTop: EChartsOption = {
    legend: {
      top: 'bottom',
      show:false,
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: []
      }
    ]
  };

  getOverallTrafficTrendOptions = {
    tooltip: {
      trigger: 'axis',
      show: true,
      showDelay: 0,
      axisPointer: {
        show: true,
        type: 'cross',
        lineStyle: {
          type: 'dashed',
          width: 1,
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        symbol: 'none',
        areaStyle: {}
      }
    ]
  };

  getAmountAndOrderInfoOptions = {
    tooltip: {
      trigger: 'axis',
     
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line',
        areaStyle: {}
      }
    ]
  };

  getSupplierAmountAndOrderTrendOptions = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [],
        type: 'line'
      }
    ]
  };


  ngOnInit(): void {
    this.getLastMonthTraffic();
    this.getOverallTrafficTrend();
    this.getAmountAndOrderInfo();
    this.getSupplierAmountAndOrderTrend();
  }

  getLastMonthTraffic(): void {
    this.service.getLastMonthTraffic().subscribe(
      (data) => {
        for(let i= 0;i<=6;i++){
          this.getLastMonthTrafficOptionsTop.series[0].data.push({name:data.data[i].name, value:data.data[i].percentage_of_total_traffic})
        }
        this.showGetLastMonthTraffic = true;
      },
      (error) => {
        console.log('Something went wrong, please try again later.');
      }
    );
  }

  getOverallTrafficTrend(): void {
    this.service.getOverallTrafficTrend().subscribe(
      (data) => {
        data.data.forEach(element => {
          this.getOverallTrafficTrendOptions.xAxis.data.push(element.xaxis_label);
          this.getOverallTrafficTrendOptions.series[0].data.push(element.number_of_hits)
        });
        this.showGetOverallTrafficTrend = true;
      },
      (error) => {
        console.log('Something went wrong, please try again later.');
      }
    );
  }

  getAmountAndOrderInfo(): void {
    this.service.getAmountAndOrderInfo().subscribe(
      (data) => {
        data.data.forEach(element => {
          this.getAmountAndOrderInfoOptions.xAxis.data.push(element.xaxis_label);
          this.getAmountAndOrderInfoOptions.series[0].data.push(element.number_of_orders)
        });
        this.showGetAmountAndOrderInfo = true;
      },
      (error) => {
        console.log('Something went wrong, please try again later.');
      }
    );
  }

  getSupplierAmountAndOrderTrend(): void {
    this.service.getSupplierAmountAndOrderTrend(1).subscribe(
      (data) => {
        data.data.forEach(element => {
          this.getSupplierAmountAndOrderTrendOptions.xAxis.data.push(element.xaxis_label);
          this.getSupplierAmountAndOrderTrendOptions.series[0].data.push(element.total)
        });
        this.showGetSupplierAmountAndOrderTrend = true;
      },
      (error) => {
        console.log('Something went wrong, please try again later.');
      }
    );
  }

}
