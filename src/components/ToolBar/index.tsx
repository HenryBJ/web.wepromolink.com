import { NavLink as Link } from "react-router-dom"
import NotiWrapper from "../NotiWrapper";
import { Menu, Transition } from "@headlessui/react";

const strokeWidth = 2.1;
const iconClass = 'w-7 h-7';

const navegation = [
    {
        title: 'Home', url: '#',
        items:[]
    },
    {
        title: 'Categories', url: '#',
        items:[
            {title:'Ofertas de Trabajos', subtitle:'Ofertas y solicitudes de trabajo remotos', url:'/c/jobs'},
            {title:'Venta de Productos fisicos', subtitle:'Compra y venta de artículos físicos', url:'/c/physical-products'},
            {title:'Ofertas de Servicios Digitales', subtitle:'Servicios digitales para empresas y particulares', url:'/c/digital-services'},
            {title:'Canales de Youtube', subtitle:'Canales populares de YouTube', url:'/c/youtube-channels'},
            {title:'Canales de Instagram', subtitle:'Cuentas de Instagram populares', url:'/c/instagram-channels'},
            {title:'Canales de Tiktok', subtitle:'Cuentas de TikTok destacadas', url:'/c/tiktok-channels'},
            {title:'Cursos online', subtitle:'Educación en línea y cursos a distancia', url:'/c/online-courses'},
            {title:'Cafeterias y Restaurantes', subtitle:'Lugares para disfrutar de comida y bebida', url:'/c/cafes-restaurants'},
            {title:'Tiendas Online', subtitle:'Tiendas virtuales para compras en línea', url:'/c/online-stores'},
            {title:'Gymnacios', subtitle:'Centros de entrenamiento físico y gimnasios', url:'/c/gyms'},
            {title:'Alquileres y Ventas de Inmuebles', subtitle:'Alquiler y venta de propiedades', url:'/c/real-estate'},
            {title:'Viajes y Hoteles', subtitle:'Agencias de viajes y alojamiento', url:'/c/travel-hotels'}
        ]
    },
    {
        title: 'Servicies', url: '/',
        items:[]
    },
    {
        title: 'Marketplaces', url: '/',
        items:[]
    },
    {
        title: 'Blogs', url: '/',
        items:[]
    },
    
]

export default function ToolBar() {
    return (
        <div className="bg-white w-full max-w-lg md:w-fit flex flex-row">
            {navegation.map((e, i) =>
            <>
                    {e.items.length === 0 && <Link title={e.title} key={i} to={e.url} className="text-gray-600 text-sm xxs:text-base m-1 sm:mx-4 h-full w-full md:hover:ring-2 p-1 ring-white rounded-full cursor-default md:cursor-pointer">
                        {({ isActive }) => (<div className={isActive ? 'text-orange-400 ' : ''}>{e.title}</div>)}
                    </Link>}
                    {e.items.length > 0 && (
                        <Menu>
                            {({open, close})=>(
                                <>
                                <Menu.Button className="focus:outline-none"
                                 onMouseEnter={({ target }:any) => open ? "" : target.click?.()}>
                                  <div className="cursor-pointer m-1 sm:mx-4 text-gray-600 text-sm xxs:text-base hover:text-orange-400">{e.title}</div>      
                                </Menu.Button>
                                <Transition className="z-50"
                                    enter="transition duration-50 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-50 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Menu.Items
                                    onMouseLeave={({ target }:any) => close()}
                                    className="absolute top-10 right-7 mt-0 w-96 px-3 py-3  origin-top-right rounded bg-white shadow-lg ring-1 ring-gray-400 ring-opacity-25  focus:outline-none text-center text-gray-600 font-semibold">
                                        {e.items.map((submenu, index)=>(<Menu.Item>
                                            {({ active }) => (
                                                <div>
                                                   {submenu.title}
                                                </div>
                                            )}
                                        </Menu.Item>))}
                                    </Menu.Items>
                                </Transition>
                                </>
                            )}
                        </Menu>
                    )}
            </>
            )}
        </div>
    )
}





// export default function ToolBar() {
//     return (
//         <div className="bg-white w-full max-w-lg md:w-fit flex flex-row">
//             {navegation.map((e, i) => (
//                     <Link title={e.title} key={i} to={e.url} className="text-gray-300 mx-4 h-full w-full md:hover:ring-2 p-1 ring-white rounded-full cursor-default md:cursor-pointer">
//                         {({ isActive }) => (<NotiWrapper notiIndex={e.notiIndex}> <div className={isActive ? 'text-orange-400 ' : ''}>{e.icon}</div></NotiWrapper>)}
//                     </Link>
//             ))}
//         </div>
//     )
// }