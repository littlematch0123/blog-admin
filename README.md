# 项目说明

&emsp;&emsp;该项目是使用react、redux、styled-components开发的一套博客后台管理系统

【域名】

&emsp;&emsp;admin.xiaohuochai.cc 
  

【功能模块】

&emsp;&emsp;功能包括文章管理、类别管理、推荐管理和用户管理

&emsp;&emsp;1、文章管理(components/Post)：按类别筛选文章、按标题搜索文章、查看文章、添加文章、编辑文章、设置文章配图、删除文章、查看点赞、查看评论、删除评论

&emsp;&emsp;2、类别管理(components/Category)：查看类别、添加类别、编辑类别、删除类别

&emsp;&emsp;3、推荐管理(components/Recommend): 修改推荐的专题、修改推荐的文章、更改推荐的显示次序

&emsp;&emsp;4、用户管理(components/User): 查看所有用户信息、查看用户点赞情况、查看用户评论情况、按用户名拼音排序、按点赞数排序、按评论数排序、设置用户状态



【项目亮点】

&emsp;&emsp;1、采用styled-components，实现css in JS。所有图标资源均采用svg格式，并存储到common/BaseImg组件中，方便管理，图片资源均上传到七牛云图床，使用外链访问。最终，html、css、image都使用js管理，结构清晰

&emsp;&emsp;2、采用移动优先的响应式布局，移动端、桌面端均可适配；字体大小使用em单位，桌面端的文字相应变大，提升阅读体验；移动端使用滑动操作可滑出类别条目、推荐条目的编辑选项，而桌面端则直接显示编辑按钮

&emsp;&emsp;3、借鉴google的材料设计，采用统一的色调处理，除了黑白两色外，所有页面共使用了8种颜色，保证了页面颜色素雅、统一，且桌面端采用了与页面色调统一的自定义滚动条

&emsp;&emsp;4、在common目录下，封装了多个基础组件，如全屏组件、返回组件、面包屑组件、滑动组件等，方便开发。功能组件按照功能而不是类别分类，component、container整合为一个文件，使得结构清晰，易于查找

&emsp;&emsp;5、状态管理借鉴了vuex的管理模式，action-types、action、reducer、selecter、state整合到一个module.js文件下，方便管理。且为了方便扩展，所有的state都设置了filter字段

&emsp;&emsp;6、设置了全局的弹出框、加载框，封装了fetch获取后端数据的async方法，使到异步操作较为方便

&emsp;&emsp;7、代码风格参照airbnb规范，规范了变量命名，采用小驼峰写法，异步操作增加async后缀，函数基本以get或set为前缀，布尔值基本以do或is为前缀

&emsp;&emsp;8、类别管理中采用10位数字中每2位一级的扁平化结构处理，思路清晰，方法简便

&emsp;&emsp;9、增加了摇一摇功能，可以直接摇到前台页面

&emsp;&emsp;10、使用react新增的ref方法、生命周期方法

