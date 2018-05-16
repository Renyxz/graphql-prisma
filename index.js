const { GraphQLServer } = require('graphql-yoga');

const links = [{
    id: 'link_0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
}];


let idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'API',
        feed: () => links
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link_${ idCount++ }`,
                description: args.description,
                url: args.url
            };
            
            links.push(link);

            return link;
        },

        updateLink: (root, args) => {
            let index;
            links.forEach( (link, i) => {
                if(link.id === args.id) {
                    
                    link.description = args.description;
                    link.url = args.url;
                    index = i;
                }
            });
            
            return links[index];
        },

        deleteLink: (root, args) => {
            let index;
            let deletedLink;
            links.forEach( (link, i) => {
                if(link.id === args.id) {
                    index = i;
                    deletedLink = link
                }
            });

            links.splice(index, 1);

            return deletedLink;
        }
    }

    // Link: {
    //     id: (root) => root.id,
    //     description: (root) => root.description,
    //     url: (root) => root.url
    // }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start( (info) => {
    console.log('Server is running on: ', info.port);
});