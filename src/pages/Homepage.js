import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEWS = gql`
    query GetReviews{
        reviews{
            title,
            body,
            rating,
            id,
            categories{
                name, 
                id
            }
        }
    }
`


const Homepage = () => {

    const {loading, error, data} = useQuery(REVIEWS)
    
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>

    return (
        <div>
            {data.reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.rating}</div>
                    <h2>{review.title}</h2>

                    {review.categories.map(c => (
                        <small key={c.id}>{c.name}</small>
                    ))}

                    <ReactMarkdown>{review.body.substring(0, 200)}...</ReactMarkdown>

                    <Link to={`/details/${review.id}`}>Read More</Link>
                </div>
            ))}
        </div>
    );
}

export default Homepage;