import React,{ useState,useEffect } from "react"
import { getProductHTTP } from "../http/ProductHTTP";

export default function RenderProduct() {
    const [products, setProduct] = useState(null)
    useEffect(() => {
        (async function getProductAPI() {
            const products = await getProductHTTP()
            console.log('product',products);
            products.reverse()
            window.sessionStorage.setItem("products", JSON.stringify(products));
            setProduct([...products])
        })()

    }, [])

    return (
        <tbody id='table-product'>
            {
                products &&
                products.map((product) => {
                    return (
                        <tr>
                            <td>
                                <div class="d-flex px-2 py-1">
                                    <div>
                                        <img src={`${product.image}`} class="avatar avatar-sm me-3" alt="user1" />
                                    </div>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 class="mb-0 text-sm" >{product.name}</h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="text-xs font-weight-bold mb-0" style={{width:200, overflow: "hidden",textOverflow: "ellipsis"}}>{product.description}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                                <span class="badge badge-sm bg-gradient-success">{product.price}</span>
                            </td>
                            <td class="align-middle text-center">
                                <span class="text-secondary text-xs font-weight-bold">{product.category.name}</span>
                            </td>
                            <td class="align-middle">
                                <a href={`/edit/${product.id}`} class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                    Edit
                                </a>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    )

    
}