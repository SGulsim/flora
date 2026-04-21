import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";import{t as r}from"./icon-CegsbWHe.js";var i=e(t()),a=n(),o={title:`UI/AddonCard`,parameters:{layout:`centered`},tags:[`autodocs`]},s=[{id:`card`,name:`Открытка`,price:0,icon:`solar:letter-linear`},{id:`balloon`,name:`Шарик`,price:150,icon:`solar:star-circle-linear`},{id:`candy`,name:`Конфеты`,price:300,icon:`solar:gift-linear`}];function c({addon:e}){let[t,n]=(0,i.useState)(!1);return(0,a.jsxs)(`div`,{className:`border rounded-2xl p-3 flex flex-col items-center text-center group transition-colors ${t?`border-neutral-300 bg-neutral-50`:`border-neutral-100 hover:border-neutral-200`}`,children:[(0,a.jsx)(`div`,{className:`w-16 h-16 bg-neutral-50 rounded-full mb-3 flex items-center justify-center text-neutral-400 group-hover:text-rose-400 transition-colors`,children:(0,a.jsx)(r,{icon:e.icon,width:28,height:28})}),(0,a.jsx)(`p`,{className:`text-xs font-medium text-neutral-900 mb-1`,children:e.name}),(0,a.jsx)(`p`,{className:`text-xs text-neutral-500 mb-3`,children:e.price===0?`Бесплатно`:`+ ${e.price.toLocaleString(`ru-RU`)} ₽`}),(0,a.jsx)(`button`,{type:`button`,onClick:()=>n(e=>!e),className:`text-xs font-medium px-4 py-1.5 rounded-full w-full transition-colors ${t?`bg-neutral-900 text-white`:`text-neutral-900 bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white`}`,children:t?`Убрать`:`Добавить`})]})}var l={render:()=>(0,a.jsx)(`div`,{style:{width:140},children:(0,a.jsx)(c,{addon:s[0]})})},u={render:()=>(0,a.jsx)(`div`,{className:`grid grid-cols-3 gap-4`,style:{width:460},children:s.map(e=>(0,a.jsx)(c,{addon:e},e.id))})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 140
  }}>
      <AddonCardItem addon={ADDONS[0]} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-4" style={{
    width: 460
  }}>
      {ADDONS.map(addon => <AddonCardItem key={addon.id} addon={addon} />)}
    </div>
}`,...u.parameters?.docs?.source}}};var d=[`Single`,`Grid`];export{u as Grid,l as Single,d as __namedExportsOrder,o as default};