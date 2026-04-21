import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";var r=e(t()),i=n(),a={title:`UI/ProgressBar`,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{style:{width:320},children:(0,i.jsx)(e,{})})]},o=4;function s(){let[e,t]=(0,r.useState)(0);return(0,i.jsxs)(`div`,{className:`text-center`,children:[(0,i.jsxs)(`span`,{className:`text-xs font-medium text-neutral-500 tracking-widest uppercase mb-3 block`,children:[`Шаг `,e+1,` из `,o]}),(0,i.jsx)(`div`,{className:`w-full h-1 bg-neutral-100 rounded-full mb-6 overflow-hidden`,children:(0,i.jsx)(`div`,{className:`h-full bg-neutral-900 rounded-full transition-all duration-300`,style:{width:`${(e+1)/o*100}%`}})}),(0,i.jsxs)(`div`,{className:`flex gap-2 justify-center`,children:[(0,i.jsx)(`button`,{onClick:()=>t(e=>Math.max(0,e-1)),className:`px-4 py-2 text-sm border border-neutral-200 rounded-full text-neutral-600 hover:border-neutral-300 disabled:opacity-40 cursor-pointer disabled:cursor-default`,disabled:e===0,children:`← Назад`}),(0,i.jsx)(`button`,{onClick:()=>t(e=>Math.min(o-1,e+1)),className:`px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 disabled:opacity-40 cursor-pointer disabled:cursor-default`,disabled:e===o-1,children:`Далее →`})]})]})}var c={name:`Прогресс квиза (интерактивный)`,render:()=>(0,i.jsx)(s,{})},l={render:()=>(0,i.jsx)(`div`,{className:`w-full h-1 bg-neutral-100 rounded-full overflow-hidden`,children:(0,i.jsx)(`div`,{className:`h-full bg-neutral-900 rounded-full`,style:{width:`25%`}})})},u={render:()=>(0,i.jsx)(`div`,{className:`w-full h-1 bg-neutral-100 rounded-full overflow-hidden`,children:(0,i.jsx)(`div`,{className:`h-full bg-neutral-900 rounded-full`,style:{width:`50%`}})})},d={render:()=>(0,i.jsx)(`div`,{className:`w-full h-1 bg-neutral-100 rounded-full overflow-hidden`,children:(0,i.jsx)(`div`,{className:`h-full bg-neutral-900 rounded-full`,style:{width:`100%`}})})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Прогресс квиза (интерактивный)",
  render: () => <QuizProgressBar />
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{
      width: "25%"
    }} />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{
      width: "50%"
    }} />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
      <div className="h-full bg-neutral-900 rounded-full" style={{
      width: "100%"
    }} />
    </div>
}`,...d.parameters?.docs?.source}}};var f=[`QuizProgress`,`Step1`,`Step2`,`Step4Complete`];export{c as QuizProgress,l as Step1,u as Step2,d as Step4Complete,f as __namedExportsOrder,a as default};