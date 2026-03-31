import"./iframe-DpOIhj7i.js";import{t as e}from"./react-CuCQT0Tb.js";import{t}from"./jsx-runtime-C_z3swJq.js";import{n}from"./mock-data-AA0H1dXT.js";import{t as r}from"./product-card-CnYbJ2im.js";e();var i=t(),a={title:`Catalog/ProductCard`,component:r,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:280},children:(0,i.jsx)(e,{})})]},o={args:{bouquet:n[0]}},s={args:{bouquet:{...n[0],isHit:!0}}},c={args:{bouquet:n[1]}},l={args:{bouquet:{...n[2],price:12500,name:`Роскошный пион`,isHit:!0}}},u={decorators:[()=>(0,i.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 280px)`,gap:24},children:n.map(e=>(0,i.jsx)(r,{bouquet:e},e.id))})]};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    bouquet: BOUQUETS[0]
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    bouquet: {
      ...BOUQUETS[0],
      isHit: true
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    bouquet: BOUQUETS[1]
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    bouquet: {
      ...BOUQUETS[2],
      price: 12500,
      name: "Роскошный пион",
      isHit: true
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  decorators: [() => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 280px)",
    gap: 24
  }}>
        {BOUQUETS.map(b => <ProductCard key={b.id} bouquet={b} />)}
      </div>]
}`,...u.parameters?.docs?.source}}};var d=[`Default`,`Hit`,`LowPrice`,`HighPrice`,`Grid`];export{o as Default,u as Grid,l as HighPrice,s as Hit,c as LowPrice,d as __namedExportsOrder,a as default};