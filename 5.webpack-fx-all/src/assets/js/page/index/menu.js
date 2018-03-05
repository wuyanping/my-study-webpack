export default [
	{
		name: '首页',
		key: 'home',
		src: '/home'
	},
	{
		name: '我的练习',
		key: 'blog',
		src: '/blog',
		children: [
			{
				name: '练习1',
				key: 'lx1',
				src: '/lx1',
				children: [
					{
						name: '练习1-1',
						key: 'lx1-1',
						src: '/lx1-1'
					},
					{
						name: '练习1-2',
						key: 'lx1-2',
						src: '/lx1-2'
					}
				]
			},
			{
				name: '练习2',
				key: 'lx2',
				src: '/lx2',
				children: [
					{
						name: '练习2-1',
						key: 'lx2-1',
						src: '/lx2-1'
					},
					{
						name: '练习2-2',
						key: 'lx2-2',
						src: '/lx2-2'
					}
				]
			}
		]
	},
	{
		name: '我的个人信息',
		key: 'info',
		src: '/info'
	},
]