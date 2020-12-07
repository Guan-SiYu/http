import React, { Component } from 'react'
import './App.css'
import http from './services/http'
import config from './config.json'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
class App extends Component {
    state = {
        posts: [],
    }

    async componentDidMount() {
        const { data: posts } = await http.get(config.apiEndpoint)
        this.setState({ posts })
    }

    handleAdd = async () => {
        const obj = { title: 'a', body: 'b' }
        const { data: post } = await http.post(config.apiEndpoint, obj)
        this.setState({ posts: [post, ...this.state.posts] })
    }

    handleUpdate = async (post) => {
        const { data } = await http.put(
            config.apiEndpoint + '/' + post.id,
            post
        ) //patch
        console.log(data)
        const posts = [...this.state.posts]
        const idx = posts.indexOf(post)
        posts[idx] = { ...data, title: 'UPDATED' }
        this.setState({ posts })
    }

    handleDelete = async (post) => {
        const originalPosts = this.state.posts
        //保守更新
        const posts = this.state.posts.filter((i) => i.id !== post.id)
        this.setState({ posts })

        try {
            await http.delete('a' + config.apiEndpoint + '/#7####')
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                alert('服务器说你客户端发来的这个数据不对劲')

            this.setState({ posts: originalPosts })
        }
    }

    render() {
        return (
            <React.Fragment>
                <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post, idx) => (
                            <tr key={idx}>
                                <td>{post.title}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => this.handleUpdate(post)}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.handleDelete(post)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default App
