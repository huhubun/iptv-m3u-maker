import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  Toolbar,
  Paper,
  CircularProgress,
} from '@material-ui/core'
import { } from '@material-ui/icons'

import Sider from '@/components/ChannelSider/ChannelSider'
import * as ChannelAct from '@/redux/actions/channel'

import './ChannelList.less'

class ChannelList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cur: 1,
      data: [],
      loading: false,
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const state = nextProps.channelState

    if (!prevState.loading && state.loading) {
      return {
        ...prevState,
        loading: true,
      }
    }

    if (prevState.loading && typeof(state.list[prevState.cur]) !== 'undefined') {
      return {
        ...prevState,
        data: state.list[prevState.cur],
        loading: false,
      }
    }

    return null
  }

  render() {
    return (
      <div className='ChannelList'>
        <Drawer
          variant="permanent"
          className='menu'
        >
          <Toolbar />
          <Sider />
        </Drawer>
        <div className='content'>
          {this.state.loading
            ? (
              <div className='loading'>
                <CircularProgress />
              </div>
            )
            : this.renderTable()
          }

        </div>
      </div>
    )
  }

  renderTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="Channel List">
          <TableHead>
            <TableRow>
              <TableCell align="right">No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Alias</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Icon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="right">
                  {row.num}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.alias}</TableCell>
                <TableCell>{row.group}</TableCell>
                <TableCell>{row.icon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = (p = 1) => {
    this.props.list(p)
  }
}

export default connect(
  (state) => ({
    channelState: state.channelState,
  }),
  (dispatch) => ({
    list: (p) => dispatch(ChannelAct.list(p)),
  })
)(ChannelList)
