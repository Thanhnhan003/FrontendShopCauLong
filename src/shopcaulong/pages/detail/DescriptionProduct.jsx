import React from 'react'

export default function DescriptionProduct({productDescription}) {
    return (
        <div class="row ">
            <div class="col-12 col-xl-12  col-lg-12">
                <div class="text-content">
                    {/* <h2>Lorem ipsum <a href="#!">dolor sit amet consectetur</a> adipisicing elit.
                        Optio, odit.</h2> */}
                    <p>{productDescription}</p>
                </div>
            </div>
        </div>
    )
}
