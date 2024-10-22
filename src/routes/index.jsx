import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom'
import Navbar from '../components/Navbar'

// Public Routes
import SignUpIndex from '../views/SignUp'
import LoginIndex from '../views/Login'

// Private Routes
import Overview from '../views/Overview'
import Transactions from '../views/Transactions'
import TransactionsForm from '../views/Transactions/form'
import Categories from '../views/Categories'
import CategoriesForm from '../views/Categories/form'


function IndexRoutes() {

    const authVerify = () => {
        return localStorage.getItem('token');
    }

    // Public route with navbar
    const PublicRoute = ({ element: Component, ...props }) => {
        return <>
            {/* <Navbar /> */}
            <Component {...props} />
        </>
    }

    // Private route with navbar
    const PrivateRoute = ({ element: Component, ...props }) => {
        const isAuthenticated = authVerify()

        return isAuthenticated
            ? <>
                <Navbar />
                <Component {...props} />
            </>
            : <Navigate to="/login" />
    }

    // Redirect connected users
    const RedirectConnected = ({ element: Component, ...props }) => {
        const isAuthenticated = authVerify()

        return isAuthenticated
            ? <Navigate to="/overview" />
            : <Component {...props} />

    }

    return (
        <Router>
            <Routes>

                {/* Public Routes Redirect Connected*/}
                <Route
                    path="/signup"
                    element={<RedirectConnected element={SignUpIndex} />}
                />
                <Route
                    path="/login"
                    element={<RedirectConnected element={LoginIndex} />}
                />

                {/* Public Routes */}
                {/* <Route
                    path="/"
                    element={<PublicRoute element={} />}
                /> */}

                {/* Private Routes */}
                <Route
                    path="/overview"
                    element={<PrivateRoute element={Overview} />}
                />
                <Route
                    path="/transactions"
                    element={<PrivateRoute element={Transactions} />}
                />
                <Route
                    path="/transactions/new"
                    element={<PrivateRoute element={TransactionsForm} />}
                />
                <Route
                    path="/transactions/edit/:id"
                    element={<PrivateRoute element={TransactionsForm} />}
                />
                <Route
                    path="/categories"
                    element={<PrivateRoute element={Categories} />}
                />
                <Route
                    path="/categories/new"
                    element={<PrivateRoute element={CategoriesForm} />}
                />
                <Route
                    path="/categories/edit/:id"
                    element={<PrivateRoute element={CategoriesForm} />}
                />

            </Routes>
        </Router>
    )
}

export default IndexRoutes
