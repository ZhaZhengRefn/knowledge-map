# Concepts

## Entry Point
- 单入口: 单个入口可以采用字符串或者对象语法
- 多入口: 多个入口可以使用数组语法或者对象语法。但对象语法方便配置的merge，扩展性更强。
```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

## Output
Output属性的最基本两个属性为```path```与```filename```
```js
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};
```

## Mode
启用不同的```mode```可以开启相应的配置，让webpack做部分内置优化

| 选项                | 描述                                                                                                                                                                                                             |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ```development``` | 会将```process.env.NODE_ENV```的值设为 development。启用```NamedChunksPlugin``` 和 ```NamedModulesPlugin```                                                                                                              |
| ```production```  | 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin |

- mode: development
```js
module.exports = {
  mode: 'development'
  // plugins: [
  //   new webpack.NamedModulesPlugin(),
  //   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  // ]
}
```

- mode: production
```js
module.exports = {
   mode: 'production',
  //  plugins: [
  //    new UglifyJsPlugin(/* ... */),
  //    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
  //    new webpack.optimize.ModuleConcatenationPlugin(),
  //    new webpack.NoEmitOnErrorsPlugin()
  // ]
}
```

## Loader
Loader推荐使用配置的语法进行配置
```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```
Loader具备以下特性:
- 链式传递。以相反的顺序执行。
- 接受查询参数进行配置。
- 同样也接受options字段进行配置。
- 遵循模块解析。

## 插件
插件本质上即具备apply属性的对象。
```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

用法: 实例化插件并传入option
```js
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
```

## 模块解析规则
1. 绝对路径
无须解析
```js
import '/user/local/foo/bar.js'
```
2. 相对路径
以当前路径为上下文，解析出绝对路径
```js
import '../src/foo.js'
```
3. 模块路径
- 搜索范围: 
```resolve.modules```中指定的所有目录中搜索。其中，引用路径可以做别名```resolve.alias```方便书写
- 匹配方式
若引用路径为某个文件，则按照```resolve.extensions```规则逐个匹配。
若引用路径为某个文件夹，则情况会复杂一点。
假如具备package.json，则会按照```resolve.mainFields```的配置读取package.json相应字段，引用其指向的文件。
文件按```resolve.extensions```匹配。

常见场景如，有些包会导出几种不同环境的bundle文件，引用者按照自己的需求引用不同的入口文件。
如D3.js
```js
{
  ...
  main: 'build/d3.Node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```
若作如下配置:
```js
mainFields: ["browser", "module", "main"]
```
则会先引用其浏览器的版本。

## Manifest
一般来说一个项目的代码会分成三部分:
  1. 业务代码
  2. 三方库
  3. webpack的runtime与manifest，负责模块之间的交互

- runtime
runtime包含: 在模块交互时，连接模块所需要的加载和解析的逻辑。例如部分被拆分的懒加载模块，什么时候加载、怎么解析就是runtime的工作
- manifest
manifest顾名思义即清单。runtime要加载某个模块，就需要模块的标识符。根据manifest的数据，runtime才可以找到要加载的模块。

## 模块热加载
需要注意在模块中可以接入模块热加载的一些接口，常见的如在模块更新后执行某些操作
```js
if (module.hot) {
  module.hot.accept('./library.js', function() {
    // 使用更新过的 library 模块执行某些操作...
  })
}
```