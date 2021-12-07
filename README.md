# ScanwichAnalytics

#### copy paste the following in package.json
"echarts": "^5.2.2",
"ngx-echarts": "^7.0.0",


#### Import the library in app.module.ts
imports: [
   ...
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ...
  ],