import"./iframe-DpOIhj7i.js";import{t as e}from"./react-CuCQT0Tb.js";import{t}from"./jsx-runtime-C_z3swJq.js";import{t as n}from"./icon-CegsbWHe.js";e();var r=t(),i={title:`UI/Rating`,parameters:{layout:`centered`},tags:[`autodocs`]};function a({value:e,count:t}){return(0,r.jsxs)(`div`,{className:`flex items-center gap-1 text-xs font-medium text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md`,children:[(0,r.jsx)(n,{icon:`solar:star-bold`,width:14,height:14}),e,(0,r.jsxs)(`span`,{className:`text-neutral-400 font-normal ml-1`,children:[`(`,t,`)`]})]})}var o={render:()=>(0,r.jsx)(a,{value:4.9,count:12})},s={render:()=>(0,r.jsx)(a,{value:5,count:24})},c={name:`В контексте карточки`,render:()=>(0,r.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,r.jsx)(`span`,{className:`text-2xl font-medium text-neutral-900 tracking-tight`,children:`4 500 ₽`}),(0,r.jsx)(a,{value:4.9,count:12})]})},l={render:()=>(0,r.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,r.jsx)(a,{value:5,count:24}),(0,r.jsx)(a,{value:4.9,count:12}),(0,r.jsx)(a,{value:4.5,count:6}),(0,r.jsx)(a,{value:4,count:3})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <RatingBadge value={4.9} count={12} />
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <RatingBadge value={5.0} count={24} />
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "В контексте карточки",
  render: () => <div className="flex items-center gap-4">
      <span className="text-2xl font-medium text-neutral-900 tracking-tight">
        4 500 ₽
      </span>
      <RatingBadge value={4.9} count={12} />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      <RatingBadge value={5.0} count={24} />
      <RatingBadge value={4.9} count={12} />
      <RatingBadge value={4.5} count={6} />
      <RatingBadge value={4.0} count={3} />
    </div>
}`,...l.parameters?.docs?.source}}};var u=[`Default`,`Perfect`,`InContext`,`AllVariants`];export{l as AllVariants,o as Default,c as InContext,s as Perfect,u as __namedExportsOrder,i as default};