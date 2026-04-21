import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";import{t as r}from"./catalog-filters-BlnL5mSG.js";var i=e(t()),a=n(),o={title:`Catalog/CatalogFilters`,component:r,tags:[`autodocs`],parameters:{layout:`padded`},decorators:[e=>(0,a.jsx)(`div`,{style:{maxWidth:280},children:(0,a.jsx)(e,{})})]},s={render:()=>{let[e,t]=(0,i.useState)([]),[n,o]=(0,i.useState)(1e3),[s,c]=(0,i.useState)(15e3);return(0,a.jsxs)(`div`,{children:[(0,a.jsx)(r,{occasionFilter:e,onOccasionChange:(e,n)=>t(t=>n?[...t,e]:t.filter(t=>t!==e)),priceMin:n,priceMax:s,onPriceChange:(e,t)=>{o(e),c(t)}}),(0,a.jsxs)(`div`,{className:`mt-6 p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500`,children:[(0,a.jsxs)(`p`,{children:[`Поводы: `,e.length>0?e.join(`, `):`все`]}),(0,a.jsxs)(`p`,{children:[`Цена: `,n.toLocaleString(`ru-RU`),` – `,s.toLocaleString(`ru-RU`),` ₽`]})]})]})}},c={render:()=>{let[e,t]=(0,i.useState)([`birthday`,`date`]),[n,o]=(0,i.useState)(2e3),[s,c]=(0,i.useState)(8e3);return(0,a.jsx)(r,{occasionFilter:e,onOccasionChange:(e,n)=>t(t=>n?[...t,e]:t.filter(t=>t!==e)),priceMin:n,priceMax:s,onPriceChange:(e,t)=>{o(e),c(t)}})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [occasionFilter, setOccasionFilter] = useState<string[]>([]);
    const [priceMin, setPriceMin] = useState(1000);
    const [priceMax, setPriceMax] = useState(15000);
    return <div>
        <CatalogFilters occasionFilter={occasionFilter} onOccasionChange={(id, checked) => setOccasionFilter(prev => checked ? [...prev, id] : prev.filter(o => o !== id))} priceMin={priceMin} priceMax={priceMax} onPriceChange={(min, max) => {
        setPriceMin(min);
        setPriceMax(max);
      }} />
        <div className="mt-6 p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500">
          <p>Поводы: {occasionFilter.length > 0 ? occasionFilter.join(", ") : "все"}</p>
          <p>Цена: {priceMin.toLocaleString("ru-RU")} – {priceMax.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>;
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [occasionFilter, setOccasionFilter] = useState<string[]>(["birthday", "date"]);
    const [priceMin, setPriceMin] = useState(2000);
    const [priceMax, setPriceMax] = useState(8000);
    return <CatalogFilters occasionFilter={occasionFilter} onOccasionChange={(id, checked) => setOccasionFilter(prev => checked ? [...prev, id] : prev.filter(o => o !== id))} priceMin={priceMin} priceMax={priceMax} onPriceChange={(min, max) => {
      setPriceMin(min);
      setPriceMax(max);
    }} />;
  }
}`,...c.parameters?.docs?.source}}};var l=[`Interactive`,`WithPreselected`];export{s as Interactive,c as WithPreselected,l as __namedExportsOrder,o as default};