import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { IoIosArrowForward } from 'react-icons/io'

const BreadCrumb = ({ title, category}) => {
  const routes = [
    { path: '/homeshopping/:category', breadcrumb: category },
    { path: '/homeshopping', breadcrumb: 'HomeShopping' },
    { path: '/:category/:pid/:title', breadcrumb: title },
    

  ]
  const breadcrumb = useBreadcrumbs(routes)
  return (
    <div className="flex items-center gap-1 text-sm">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link className="flex items-center hover:text-primary" key={match.pathname} to={match.pathname}>
            <span className="uppercase">{breadcrumb}</span>
            {index !== self.length - 1 && <IoIosArrowForward />}
          </Link>
        ))}
    </div>
  )
}

export default BreadCrumb
