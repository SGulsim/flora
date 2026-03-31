import"./iframe-DpOIhj7i.js";import{t as e}from"./react-CuCQT0Tb.js";import{t}from"./jsx-runtime-C_z3swJq.js";e();var n=t(),r={title:`UI/Scrollbar`,parameters:{layout:`centered`},tags:[`autodocs`]},i=Array.from({length:20},(e,t)=>`Пункт списка ${t+1}`),a={name:`Вертикальный скроллбар`,render:()=>(0,n.jsx)(`div`,{className:`overflow-y-auto border border-neutral-100 rounded-2xl`,style:{height:240,width:300},children:(0,n.jsx)(`div`,{className:`p-4 space-y-3`,children:i.map(e=>(0,n.jsx)(`div`,{className:`px-4 py-2.5 bg-neutral-50 rounded-xl text-sm text-neutral-700`,children:e},e))})})},o={name:`Горизонтальный скроллбар`,render:()=>(0,n.jsx)(`div`,{className:`overflow-x-auto border border-neutral-100 rounded-2xl`,style:{width:300},children:(0,n.jsx)(`div`,{className:`flex gap-3 p-4`,style:{width:900},children:i.slice(0,10).map(e=>(0,n.jsx)(`div`,{className:`flex-shrink-0 px-4 py-3 bg-neutral-50 rounded-xl text-sm text-neutral-700 w-32 text-center`,children:e},e))})})},s={name:`Скроллбар в модальном окне`,render:()=>(0,n.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-lg border border-neutral-100 p-6`,style:{width:360},children:[(0,n.jsx)(`h3`,{className:`text-lg font-medium text-neutral-900 mb-4`,children:`Список букетов`}),(0,n.jsx)(`div`,{className:`overflow-y-auto space-y-2 pr-1`,style:{maxHeight:200},children:i.map(e=>(0,n.jsxs)(`div`,{className:`flex items-center justify-between py-2 border-b border-neutral-50 last:border-0`,children:[(0,n.jsx)(`span`,{className:`text-sm text-neutral-700`,children:e}),(0,n.jsx)(`span`,{className:`text-sm font-medium text-neutral-900`,children:`4 500 ₽`})]},e))})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Вертикальный скроллбар",
  render: () => <div className="overflow-y-auto border border-neutral-100 rounded-2xl" style={{
    height: 240,
    width: 300
  }}>
      <div className="p-4 space-y-3">
        {ITEMS.map(item => <div key={item} className="px-4 py-2.5 bg-neutral-50 rounded-xl text-sm text-neutral-700">
            {item}
          </div>)}
      </div>
    </div>
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Горизонтальный скроллбар",
  render: () => <div className="overflow-x-auto border border-neutral-100 rounded-2xl" style={{
    width: 300
  }}>
      <div className="flex gap-3 p-4" style={{
      width: 900
    }}>
        {ITEMS.slice(0, 10).map(item => <div key={item} className="flex-shrink-0 px-4 py-3 bg-neutral-50 rounded-xl text-sm text-neutral-700 w-32 text-center">
            {item}
          </div>)}
      </div>
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Скроллбар в модальном окне",
  render: () => <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6" style={{
    width: 360
  }}>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Список букетов</h3>
      <div className="overflow-y-auto space-y-2 pr-1" style={{
      maxHeight: 200
    }}>
        {ITEMS.map(item => <div key={item} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
            <span className="text-sm text-neutral-700">{item}</span>
            <span className="text-sm font-medium text-neutral-900">4 500 ₽</span>
          </div>)}
      </div>
    </div>
}`,...s.parameters?.docs?.source}}};var c=[`VerticalScroll`,`HorizontalScroll`,`InModal`];export{o as HorizontalScroll,s as InModal,a as VerticalScroll,c as __namedExportsOrder,r as default};