import React,{ useState,useEffect } from "react"
import { getCategoriesHTTP, getProductHTTP } from "../http/ProductHTTP";

export default function RenderCategory() {
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        (async function getCategoryAPI() {
            const categories = await getCategoriesHTTP()
            categories.reverse()
            window.sessionStorage.setItem("categories", JSON.stringify(categories));
            setCategories([...categories])
        })()

    }, [])

    return (
        <tbody>
            {
                categories &&
                categories.map((category) => {
                    console.log('category',category);
                    return (
                        <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                                <img src={`${category.image}`} class="avatar avatar-sm me-3" alt="user1" />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm" >{category.name}</h6>
                            </div>
                          </div>
                        </td>

                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{category.products.length}</span>
                        </td>
                        <td class="align-middle">
                          <a href={`/edit-category/${category.id}`} class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
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