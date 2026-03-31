import{s as e}from"./iframe-DpOIhj7i.js";import{t}from"./react-CuCQT0Tb.js";import{t as n}from"./jsx-runtime-C_z3swJq.js";import{t as r}from"./next-image-DVOt6rbK.js";var i=e(t()),a=n(),o={title:`UI/ImageSelector`,parameters:{layout:`centered`},tags:[`autodocs`]},s=[`https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=600&auto=format&fit=crop`,`https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=600&auto=format&fit=crop`,`https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop`],c={render:()=>{let[e,t]=(0,i.useState)(0);return(0,a.jsxs)(`div`,{className:`space-y-4`,style:{width:360},children:[(0,a.jsx)(`div`,{className:`aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-100 relative`,children:(0,a.jsx)(r,{src:s[e],alt:`Букет`,fill:!0,className:`object-cover`})}),(0,a.jsx)(`div`,{className:`grid grid-cols-4 gap-4`,children:s.map((n,i)=>(0,a.jsx)(`button`,{onClick:()=>t(i),className:`aspect-square rounded-xl overflow-hidden bg-neutral-100 cursor-pointer transition-all ${e===i?`border-2 border-neutral-900`:`border border-transparent hover:border-neutral-200 opacity-60 hover:opacity-100`}`,children:(0,a.jsx)(r,{src:n,alt:``,className:`w-full h-full object-cover`})},i))})]})}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState(0);
    return <div className="space-y-4" style={{
      width: 360
    }}>
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-100 relative">
          <NextImage src={IMAGES[selected]} alt="Букет" fill className="object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {IMAGES.map((img, i) => <button key={i} onClick={() => setSelected(i)} className={\`aspect-square rounded-xl overflow-hidden bg-neutral-100 cursor-pointer transition-all \${selected === i ? "border-2 border-neutral-900" : "border border-transparent hover:border-neutral-200 opacity-60 hover:opacity-100"}\`}>
              <NextImage src={img} alt="" className="w-full h-full object-cover" />
            </button>)}
        </div>
      </div>;
  }
}`,...c.parameters?.docs?.source}}};var l=[`Default`];export{c as Default,l as __namedExportsOrder,o as default};