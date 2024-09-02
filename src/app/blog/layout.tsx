import '../../index.css'
import type { Metadata } from "next"

export const metadata:Metadata = {
    title:'WePromoLink-Blog',
    description:'Promotion and advertising platform | Unleash the potential of your social networks',
    // themeColor:'#ea7227',
    keywords:['marketing','promotion','online profit','increase sales','campaigns','earn per click','promote your business'],
    authors:[{name:'B-Tech Innovation Studios',url:'https://beniteztechsolutions.com/'},{name:'Jose Benitez',url:'https://joseenrique.dev/'}],
    openGraph:{
        type:'website',
        url:'https://wepromolink.com',
        images:{url:'https://wepromolink.com/og.png'},
        description:'Promotion and advertising platform | Unleash the potential of your social networks'
    },
    twitter:{
        card:'summary_large_image',
        site:'@wepromolink',
        description:'Promotion and advertising platform | Unleash the potential of your social networks',
        images:{url:'https://wepromolink.com/og.png', alt:'Promotion and advertising platform'}
    },
    robots:'index, follow'
}


export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (<div>{children}</div>)
  }