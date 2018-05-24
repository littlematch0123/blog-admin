import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryRootList from './CategoryRootList'
import CategoryItemList from './CategoryItemList'
import AddCategory from './AddCategory'
import UpdateCategory from './UpdateCategory'
import DeleteCategory from './DeleteCategory'

const Category = () =>
  (
    <Switch>
      <Route exact path="/categories" component={CategoryRootList} />
      <Route exact path="/categories/:id" component={CategoryItemList} />
      <Route path="/categories/:id/add" component={AddCategory} />
      <Route path="/categories/:id/update" component={UpdateCategory} />
      <Route path="/categories/:id/delete" component={DeleteCategory} />
    </Switch>
  )

export default Category
