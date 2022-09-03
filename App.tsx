import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, ApolloError, DocumentNode } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

type User = {
  id: number;
  first_name: string;
  email_address: string;
  bio: string;
}

type Users = {
  user_profiles: Array<User>
}

const client = new ApolloClient({
  uri: 'localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

const GET_USERS = gql`
  query GetUsers {
    user_profiles {
      id
      email_address
      first_name
      bio
    }
  }
`;

const DisplayUsers = () => {
  const { loading, error, data } = useQuery<Users>(GET_USERS);

  if (loading) return <Text>Loading...</Text>;
  if (error || !data) return <Text>Error :</Text>;

  const compArr = data.user_profiles.map(({id, first_name, email_address, bio}: User) => (
    <View key={id}>
      <Text style={{fontSize: 20}}>{'\n' + first_name + '\n' + email_address}</Text>
      <Text style={{fontStyle: 'italic'}}>About this user:</Text>
      <Text>{bio + '\n'}</Text>
    </View>
  ));
  return (<ScrollView>{compArr}</ScrollView>);

}


export default function App() {
  return (
    <ApolloProvider client={client}>
      <DisplayUsers/>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
