import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";var r=e(t()),i=n(),a={title:`UI/Input`,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,i.jsx)(`div`,{style:{width:360},children:(0,i.jsx)(e,{})})]},o={render:()=>(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Имя`}),(0,i.jsx)(`input`,{type:`text`,placeholder:`Иван`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all`})]})},s={render:()=>{let[e,t]=(0,r.useState)(``),n=e.length>0&&!e.includes(`@`);return(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Телефон`}),(0,i.jsx)(`input`,{type:`tel`,value:e,onChange:e=>t(e.target.value),placeholder:`+7 (999) 000-00-00`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none transition-all ${n?`border-red-300 focus:border-red-300`:`border-transparent focus:border-neutral-300`}`}),n&&(0,i.jsx)(`p`,{className:`text-xs text-red-500 mt-1 ml-1`,children:`Введите корректный номер`})]})}},c={render:()=>(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Пароль`}),(0,i.jsx)(`input`,{type:`password`,placeholder:`••••••••`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all`})]})},l={render:()=>{let[e,t]=(0,r.useState)(``);return(0,i.jsxs)(`div`,{children:[(0,i.jsxs)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:[`Текст открытки`,` `,(0,i.jsxs)(`span`,{className:`text-neutral-400`,children:[`(`,e.length,`/200)`]})]}),(0,i.jsx)(`textarea`,{rows:3,placeholder:`Текст послания...`,value:e,onChange:e=>t(e.target.value.slice(0,200)),className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all`})]})}},u={render:()=>(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Текст открытки (выключено)`}),(0,i.jsx)(`textarea`,{rows:3,placeholder:`Текст послания...`,disabled:!0,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all disabled:opacity-50`})]})},d={render:()=>(0,i.jsxs)(`div`,{className:`space-y-4`,children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Имя`}),(0,i.jsx)(`input`,{type:`text`,placeholder:`Иван`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Email`}),(0,i.jsx)(`input`,{type:`email`,placeholder:`example@mail.ru`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Телефон (ошибка)`}),(0,i.jsx)(`input`,{type:`tel`,defaultValue:`123`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-red-300 rounded-xl focus:bg-white focus:outline-none transition-all`}),(0,i.jsx)(`p`,{className:`text-xs text-red-500 mt-1 ml-1`,children:`Введите корректный номер`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`label`,{className:`block text-xs text-neutral-500 mb-1.5 ml-1`,children:`Сообщение`}),(0,i.jsx)(`textarea`,{rows:2,placeholder:`Текст послания...`,className:`w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all`})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя</label>
      <input type="text" placeholder="Иван" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 transition-all" />
    </div>
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    const error = value.length > 0 && !value.includes("@");
    return <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Телефон</label>
        <input type="tel" value={value} onChange={e => setValue(e.target.value)} placeholder="+7 (999) 000-00-00" className={\`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-xl focus:bg-white focus:outline-none transition-all \${error ? "border-red-300 focus:border-red-300" : "border-transparent focus:border-neutral-300"}\`} />
        {error && <p className="text-xs text-red-500 mt-1 ml-1">Введите корректный номер</p>}
      </div>;
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Пароль</label>
      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all" />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState("");
    return <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">
          Текст открытки{" "}
          <span className="text-neutral-400">({value.length}/200)</span>
        </label>
        <textarea rows={3} placeholder="Текст послания..." value={value} onChange={e => setValue(e.target.value.slice(0, 200))} className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all" />
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Текст открытки (выключено)</label>
      <textarea rows={3} placeholder="Текст послания..." disabled className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all disabled:opacity-50" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Имя</label>
        <input type="text" placeholder="Иван" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all" />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Email</label>
        <input type="email" placeholder="example@mail.ru" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none transition-all" />
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Телефон (ошибка)</label>
        <input type="tel" defaultValue="123" className="w-full px-4 py-3 text-sm bg-neutral-50 border border-red-300 rounded-xl focus:bg-white focus:outline-none transition-all" />
        <p className="text-xs text-red-500 mt-1 ml-1">Введите корректный номер</p>
      </div>
      <div>
        <label className="block text-xs text-neutral-500 mb-1.5 ml-1">Сообщение</label>
        <textarea rows={2} placeholder="Текст послания..." className="w-full px-4 py-3 text-sm bg-neutral-50 border border-transparent rounded-xl focus:bg-white focus:border-neutral-300 focus:outline-none resize-none transition-all" />
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};var f=[`Default`,`WithError`,`Password`,`Textarea`,`TextareaDisabled`,`AllInputs`];export{d as AllInputs,o as Default,c as Password,l as Textarea,u as TextareaDisabled,s as WithError,f as __namedExportsOrder,a as default};