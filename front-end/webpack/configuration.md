# Configuration
记录常见配置项

## mode
不同的Mode会开启不同的webpack优化项
```js
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- devtool: 'eval',
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.NamedChunksPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```
```js
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```
若希望自定义mode的表现，需要将配置导出为function
```js
var config = {
  entry: './app.js'
  //...
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```

## output

### output.path
```string```
导出打包文件的绝对路径。在这个参数内的```hash```substitution会被替换为本次构建的hash。

### output.filename
打包文件的文件名。*注意*这个参数只能控制打包的入口文件，不影响按需加载的chunk以及loaders创建的文件。
可使用以下几个substitution:
1. ```string```
- ```[name]```入口文件名
- ```[id]```chunk id
- ```[hash]```当前构建的hash
- ```[chunkhash]```基于模块(chunk)内容的摘要
- ```[contenthash]```extracted text的摘要
不仅如此，还能够传入路径的配置用来创建新的路径。
```js
"js/[name]/bundle.js"

2. ```function```
```js
module.exports = {
  //...
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
    },
  }
};
```

### output.publicPath
用于加载外部资源时，输出目录对应的公开url。
举个🌰
```js
module.exports = {
  //...
  output: {
    publicPath: '/assets/',
    chunkFilename: '[id].chunk.js'
  }
};
```
那么对于某个chunk的加载路径就是```/assets/4.chunk.js```
常用的值有:
```js
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

### output.library
向外导出的库的变量名。*注意*一定一定要配合libraryTarget一起使用！
webpack3.1.0以上的版本，可以对应不同的libraryTarget设置library。
```js
module.exports = {
  //...
  output: {
    library: {
      root: 'MyLibrary',
      amd: 'my-library',
      commonjs: 'my-common-library'
    },
    libraryTarget: 'umd'
  }
};
```

### output.libraryTarget
指示配置如何暴露library。
- 暴露为一个变量
```libraryTarget: "var"``` - 入口模块的返回值将会被赋值至library变量:
```js
var MyLibrary = _entry_return_;

// In a separate script...
MyLibrary.doSomething();
```

```libraryTarget: "assign"``` - 入口模块的返回值将会被赋值至隐含的全局变量:
```js
MyLibrary = _entry_return_;
```

- 在对象上赋值暴露
```libraryTarget: "this"``` - 入口模块的返回值将会被赋值为this的一个属性:
```js
this["MyLibrary"] = _entry_return_;

// 在一个单独的 script……
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```

```libraryTarget: "window"``` - 入口模块的返回值将会被赋值为window的一个属性:

```libraryTarget: "global"``` - 入口模块的返回值将会被赋值为global的一个属性:

```libraryTarget: "commonjs"``` - 入口模块的返回值将会被赋值为exports的一个属性，可用于CommonJS环境。*注意*commonjs与commonjs2有[细微的区别](https://github.com/webpack/webpack/issues/1114)。
```js
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```

- 模块定义系统
```libraryTarget: "commonjs2"``` - 入口模块的返回值将会被赋值为module.exports对象的一个属性:
```js
module.exports = _entry_return_;

require("MyLibrary").doSomething();
```

```libraryTarget: "amd"``` - 暴露为```AMD```模块。
```js
define("MyLibrary", [], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```
```js
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```
```libraryTarget: "umd"``` - 将模块暴露为所有模块系统均可以使用的方式
```js
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["MyLibrary"] = factory();
  else
    root["MyLibrary"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

### output.pathinfo
是否引入[所包含模块信息]的注释

### output.chunkFilename
这个参数决定了非入口文件(non-entry chunk)的名称。跟output.filename类似。
需要注意的是，这些文件名需要runtime根据需要请求的chunks的生成。因此如果runtime在输出bundle的时候，需要由id取替换占位符如```[name]```或者```[chunkhash]```，则需要增加id到占位符的mapping，会增加文件的大小。而且当占位符改变的时候，bundle也会失效

## module
决定如何处理模块

### module.noParse
```RegExp|[RegExp]|function```
不解析某些库。忽略某些大型库可以提升构建性能

### module.rules
多条规则

### Rule的几个概念
1. condition:
rule包括两种输入值:
  - resource: 被请求的文件
  - issuer: 提出请求的文件
举个例子:
```index.js```
```js
import A from './a.js'
```
那么```index.js```为issuer，```a.js```为resource

其中rule的```test```,```include```,```exclude```和```resource```为匹配resource的规则，```issuer```为匹配issuer的规则
2. result:
当condition匹配成功后，rule会对模块进行输出两个结果
  - Applied loader: 应用的一系列loader
  - Parse options: 解析器的选项
3. 嵌套规则
规则可以嵌套规则。直到最深一层再输出结果。

### Rule.parse
解析器的配置项
```js
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        parser: {
          amd: false, // disable AMD
          commonjs: false, // disable CommonJS
          system: false, // disable SystemJS
          harmony: false, // disable ES2015 Harmony import/export
          requireInclude: false, // disable require.include
          requireEnsure: false, // disable require.ensure
          requireContext: false, // disable require.context
          browserify: false, // disable special handling of Browserify bundles
          requireJs: false, // disable requirejs.*
          node: false, // disable __dirname, __filename, module, require.extensions, require.main, etc.
          node: {...} // reconfigure node layer on module level
        }
      }
    ]
  }
}
```
其中node字段可以匹配某些[node的全局api](https://webpack.js.org/configuration/node/)

### Rule.enforce
可能值为```"pre"|"post"```
可以指示loader的种类。loader有前置、普通、后置三种。
其中涉及[pitching-loading](https://webpack.js.org/api/loaders/#pitching-loader)的概念。loader总会从右到左（从后到前）执行。从一个loader到另一个loader会经过两个阶段:
- pitching: 执行顺序为`pre`,`inline`,`normal`,`post`
- normal: 执行顺序为`post`,`normal`,`inline`,`pre`

### Rule.exclude | Rule.include | Rule.test | Rule.resource
resource的匹配条件，可为正则表达式或者字符串。
最佳实践：
- 在`test`中使用`RegExp`，并做文件名匹配
- 在`include`或`exclude`中使用多个匹配规则（数组）
- 尽量使用`include`而非`exclude`

### Rule.issuer
issuer的匹配规则

### Rule.resourceQuery
`resource`的匹配规则，可以匹配文件名后的`query`，如:
```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.css$/,
        resourceQuery: /inline/,
        use: 'url-loader'
      }
    ]
  }
};
```
那么就可以匹配`./foo.css?inline`资源

### UseEntry概念
以我个人的理解应该是Rule输出结果之一`loader`的配置项
```js
{
  loader: "css-loader",
  options: {
    modules: true
  }
}
```
- loader: 传入字符串。解析按照resolve.resolveLoader规则进行，相对于配置的context来解析。
- options: loader的配置项
- 注意: 模块的独立标识基于**生成资源**与**所有loader**。所有loader其中也包括了选项。假如选项不能正常进行`json.stringify`将会被中断（如包含循环引用的JSON）。这个时候可以在选项中传入`ident`帮助生成模块标识。

### Rule.use
应用多个`UseEntry`，格式如上`UseEntry`所示，简写格式为`loader`的名称（字符串）

### Rule.rules
嵌套rules

### Rule.oneOf
有点类似于Promise.race，仅最先被匹配上的`UseEntry`。
```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.css$/,
        oneOf: [
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader'
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader'
          }
        ]
      }
    ]
  }
};
```

## resolve

### resolve.modules
告诉webpack解析模块时的路径。参数为数组。
有两个特性:
- 传入路径:
可以传入**绝对路径**与**相对路径**。
相对路径的搜索方式与`node_modules`类似，会一层一层地往上搜索。如先搜索当前目录的`./node_modules`与祖先目录的`../node_modules`。
- 存在优先级:
`modules: [path.resolve(__dirname, "src"), "node_modules"]`
如上情况`src`路径将会先被匹配。

### resolve.mainFields
背景：从npm包中引入入口模块文件时，可以根据不同的字段引入不同环境的版本。如：
```js
{
  ...
  main: 'build/d3.Node.js',
  browser: 'build/d3.js',
  module: 'index',
  ...
}
```
webpack会根据此字段，默认引用npm包中的某个字段对应的入口文件。
其默认值会根据webpack中`target`字段的值的变化而有所不同。
当`target`为`webworker`、`web`或者未指定时，默认值为：
```mainFields: ["browser", "module", "main"]```
当`target`为`node`时，默认值为:
```mainFields: ["module", "main"]```

### resolve.mainFiles
入口文件的文件名

### resolve.aliasFields
指定读取某个字段为alias的配置，[点击查看规范](https://github.com/defunctzombie/package-browser-field-spec)

### resolve.plugins
解析时的插件列表。参数为数组。

### resolve.unsafeCache
- 传入布尔值:
是否开启模块的缓存。主动缓存可以带来构建性能的提升，但是在极少数情况下可能会失败。
- 传入正则表达式:
匹配缓存模块的路径，表示仅缓存部分模块。

### resolve.alias
设置引入资源时，路径的别名。
- 经典用法:
```js
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```
- 在对象的键末尾加上$，开启精准匹配:
开启精准匹配的意思是指，在键设置为`foo$: './src/foo'`的情况下，当`import 'foo'`意味着`import './src/foo/index.js'`，而当`import 'foo/file.js'`则不受影响，即`import './node_modules/foo/file.js'`
**注意**：这与前者的区别在于，前者还会影响如`import 'foo/file.js'`这种模式，一旦写死alias就会报`error`。
- onlyModule:
```js
alias: [
  {
    name: "module",
    // the old request
    alias: "new-module",
    // the new request
    onlyModule: true
    // if true only "module" is aliased
    // if false "module/inner/path" is also aliased
  }
],
```

### resolve.extensions
匹配的文件名后缀。**注意**，自定义这个选项将会覆盖默认的文件名后缀选项。

### resolve.moduleExtensions
模块名后缀匹配选项

### resolve.enforceExtension
是否强制要求文件名后缀

### resolve.enforceModuleExtension
是否强制要求模块名后缀

### resolve.resolveLoader
loader的resolve选项

### resolve.resolveLoader.moduleExtensions
loader后缀解析，避免所有loader都要手写后缀。
但是官方强烈建议loader都影响手写后缀保证清晰度。

## performance

### performance.hints
可能值: `false`、`'wraning'`或`'error'`
分别为: 关闭提示、警告、报错

### performance.maxEntrypointSize
最大入口模块的大小，默认值为: `250000`(bytes)

### performance.maxAssetSize
最大单个资源文件的大小，默认值为: `250000`(bytes)

### performance.assetFilter
用于过滤提示性能的文件的函数，默认值为:
```js
function(assetFilename) {
    return !(/\.map$/.test(assetFilename))
};
```

## devtool
设置采用什么质量的source map。source map重要的地方在于mapping属性，指引了转换前后代码的位置和变量名，可以还原代码编译之前的样子。
[原理](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
[属性值](https://www.webpackjs.com/configuration/devtool/)

## context
指示当前打包资源根路径。

## target
指示webpack该资源将会打包到哪个环境，会开启部分插件做优化。
常见如`node`、`web`、`webworker`。
若常见的环境不满足需求，可以传入函数。该函数将会被传入compiler对象，可用于启用部分自定义的插件。
```js
const webpack = require('webpack');

const options = {
  target: (compiler) => {
    compiler.apply(
      new webpack.JsonpTemplatePlugin(options.output),
      new webpack.LoaderTargetPlugin('web')
    );
  }
};
```

## externals
指示webpack，哪些模块应该属于外部扩展。个人认为假如大模块被归为外部扩展，能优化构建性能。
1. 外部的library可以表现为四种形式:
  - root: 挂载全局
  - commonjs: commonjs规范，以exports上的属性访问
  - commonjs2: commonjs2规范，可以以module.exports上的属性访问
  - amd: AMD规范
  
2. 参数有如下三种形式:
  - string: 
  ```js
  module.exports = {
    externals: {
      'jquery': 'jQuery',
      'angular': 'this angular', // this["angular"]      
    },
  }
  ```

  - regexp:
  正则匹配请求
  ```js
  module.exports = {
    //...
    externals: /^(jquery|\$)$/i
  };  
  ```

  - array: 
  表示substract获取方式为`'./math'`与`'substract'`转换为父子结构。前者为父模块。
  ```js
  module.exports = {
    //...
    externals: {
      subtract: ['./math', 'subtract']
    }
  };
  ```

  - object:
  ```js
  module.exports = {
    //...
    // 表示排除`import react from 'react'`中的react模块，替换为在全局检索的react变量
    externals : {
      react: 'react'
    },

    // 或者
    // 表示lodash库的多种引入方法
    externals : {
      lodash : {
        commonjs: 'lodash',
        amd: 'lodash',
        root: '_' // 指向全局变量
      }
    },

    // 或者
    // subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）。
    externals : {
      subtract : {
        root: ['math', 'subtract']
      }
    }
  };
  ```
  
  - function: 
  使用函数可以定制化模块的`request`
  ```js
  module.exports = {
    //...
    externals: [
      function(context, request, callback) {
        if (/^yourregex$/.test(request)){
          return callback(null, 'commonjs ' + request);
        }
        callback();
      }
    ]
  };
  ```

## stats
控制显示的统计信息
