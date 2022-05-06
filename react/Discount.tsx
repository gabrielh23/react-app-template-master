import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import IconAme from './img/amecashback-icon.png';
import line from './img/line.svg';
import {useCssHandles} from 'vtex.css-handles';

const CSS_HANDLES = ['container', 'iconame', 'message', 'remove']

type PropsDiscount = {
  cashback: number
}
// 
const Discount: StorefrontFunctionComponent<PropsDiscount> = (cashback: any) => {
  const productContext = useProduct()
  const handles = useCssHandles(CSS_HANDLES)
  const [price, setPrice] = useState<number>(0) 
  const [loading, setLoading] = useState<boolean>(false)
  const [discountTotal, setDiscountTotal] = useState<number>(0)

  useEffect(() => {
    setPrice(productContext.product.priceRange.sellingPrice.highPrice)
    DiscountCalculation()
  }, [productContext])


  const DiscountCalculation = () => {
    const discount = price * (cashback.cashback / 100)
    setDiscountTotal(discount)
    setLoading(true)
  }

  const RenderDicountPrice = () => {
    return (
      <div className={`${handles.container}`}>
        <div className={`${handles.remove}`}>{discountTotal}</div>
        <img className={`${handles.iconame}`} src={IconAme} />
        <img src={line} />
        <div className={`${handles.message}`}>Receba <strong>{discountTotal.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</strong> de volta pagando com Ame.</div>
      </div>
    )
  }
  return (
    <>
      {loading ? <RenderDicountPrice /> : null }
    </>
  )
}

Discount.schema = {
  title: "Cashback Ame",
  description: "Configure o percentual do cashback",
  type: "object",
  properties: {
    cashback: {
      title: "Cashback Ame",
      description: "Valor do cashback",
      type: "number",
      default: null,
    }
  }
}

export default Discount