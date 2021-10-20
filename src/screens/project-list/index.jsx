import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"
import { cleanObject } from "utils"
import * as qs from 'qs'

// 获取api变量
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // search需要2个参数：项目名和id
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  // user列表
  const [users, setUsers] = useState([])

  // list列表
  const [list, setList] = useState([])

  // 当param改变时，去获取项目列表的数据
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  // 初始化users一次
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])


  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}