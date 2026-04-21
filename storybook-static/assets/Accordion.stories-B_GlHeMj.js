import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";import{t as r}from"./icon-CegsbWHe.js";var i=e(t()),a=n(),o={title:`UI/Accordion`,parameters:{layout:`centered`},tags:[`autodocs`],decorators:[e=>(0,a.jsx)(`div`,{style:{width:420},className:`border-t border-neutral-100`,children:(0,a.jsx)(e,{})})]};function s({title:e,children:t,defaultOpen:n=!1}){let[o,s]=(0,i.useState)(n);return(0,a.jsxs)(`div`,{className:`border-b border-neutral-100`,children:[(0,a.jsxs)(`button`,{onClick:()=>s(e=>!e),className:`w-full flex justify-between items-center py-4 font-medium text-sm text-neutral-900 cursor-pointer`,children:[e,(0,a.jsx)(r,{icon:`solar:alt-arrow-down-linear`,width:16,height:16,className:`flex-shrink-0 transition-transform duration-300 ${o?`rotate-180`:``}`})]}),(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateRows:o?`1fr`:`0fr`,transition:`grid-template-rows 0.3s ease`},children:(0,a.jsx)(`div`,{className:`overflow-hidden`,children:(0,a.jsx)(`div`,{className:`pb-4`,children:t})})})]})}var c=[{name:`Роза пионовидная`,count:`5 шт`},{name:`Эвкалипт`,count:`3 шт`},{name:`Упаковка крафт`,count:`1 шт`}],l={name:`Состав (открыт)`,render:()=>(0,a.jsx)(s,{title:`Состав`,defaultOpen:!0,children:(0,a.jsx)(`div`,{className:`text-sm text-neutral-500 space-y-2`,children:c.map(e=>(0,a.jsxs)(`div`,{className:`flex justify-between items-center`,children:[(0,a.jsx)(`span`,{children:e.name}),(0,a.jsx)(`span`,{className:`text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2`,style:{minHeight:1}}),(0,a.jsx)(`span`,{children:e.count})]},e.name))})})},u={name:`Доставка и оплата (закрыт)`,render:()=>(0,a.jsx)(s,{title:`Доставка и оплата`,children:(0,a.jsx)(`p`,{className:`text-sm text-neutral-500 leading-relaxed`,children:`Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут после сборки. Оплата картой, СБП или наличными курьеру.`})})},d={name:`Оба аккордеона`,render:()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{title:`Состав`,defaultOpen:!0,children:(0,a.jsx)(`div`,{className:`text-sm text-neutral-500 space-y-2`,children:c.map(e=>(0,a.jsxs)(`div`,{className:`flex justify-between items-center`,children:[(0,a.jsx)(`span`,{children:e.name}),(0,a.jsx)(`span`,{className:`text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2`,style:{minHeight:1}}),(0,a.jsx)(`span`,{children:e.count})]},e.name))})}),(0,a.jsx)(s,{title:`Доставка и оплата`,children:(0,a.jsx)(`p`,{className:`text-sm text-neutral-500 leading-relaxed`,children:`Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут после сборки. Оплата картой, СБП или наличными курьеру.`})}),(0,a.jsx)(s,{title:`Уход за букетом`,children:(0,a.jsx)(`p`,{className:`text-sm text-neutral-500 leading-relaxed`,children:`Меняйте воду каждые 2 дня, срезайте стебли под углом, держите вдали от прямых солнечных лучей и батарей.`})})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: "Состав (открыт)",
  render: () => <AccordionItem title="Состав" defaultOpen>
      <div className="text-sm text-neutral-500 space-y-2">
        {composition.map(item => <div key={item.name} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span className="text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2" style={{
          minHeight: 1
        }} />
            <span>{item.count}</span>
          </div>)}
      </div>
    </AccordionItem>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: "Доставка и оплата (закрыт)",
  render: () => <AccordionItem title="Доставка и оплата">
      <p className="text-sm text-neutral-500 leading-relaxed">
        Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут
        после сборки. Оплата картой, СБП или наличными курьеру.
      </p>
    </AccordionItem>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: "Оба аккордеона",
  render: () => <>
      <AccordionItem title="Состав" defaultOpen>
        <div className="text-sm text-neutral-500 space-y-2">
          {composition.map(item => <div key={item.name} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-neutral-400 border-b border-dotted border-neutral-200 flex-grow mx-2" style={{
            minHeight: 1
          }} />
              <span>{item.count}</span>
            </div>)}
        </div>
      </AccordionItem>
      <AccordionItem title="Доставка и оплата">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Бесплатная доставка по городу от 3 000 ₽. Время доставки от 60 минут
          после сборки. Оплата картой, СБП или наличными курьеру.
        </p>
      </AccordionItem>
      <AccordionItem title="Уход за букетом">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Меняйте воду каждые 2 дня, срезайте стебли под углом, держите вдали
          от прямых солнечных лучей и батарей.
        </p>
      </AccordionItem>
    </>
}`,...d.parameters?.docs?.source}}};var f=[`CompositionOpen`,`DeliveryClosed`,`Both`];export{d as Both,l as CompositionOpen,u as DeliveryClosed,f as __namedExportsOrder,o as default};