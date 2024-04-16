import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../themes";
import { useEffect, useState } from "react";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
    fechtTopRatedMovies,
    fechtTrendingMovies,
    fechtUpcomingMovies,
} from "../api/moviedb";

export const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendigMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendigMovies = async () => {
        const data = await fechtTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    };

    const getUpcomingMovies = async () => {
        const data = await fechtUpcomingMovies();
        if (data && data.results) setUpcoming(data.results);
        setLoading(false);
    };

    const getTopRatedMovies = async () => {
        const data = await fechtTopRatedMovies();
        if (data && data.results) setTopRated(data.results);
        setLoading(false);
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 262626,
            }}
        >
            <SafeAreaView style={{ marginTop: 10 }}>
                <StatusBar style="light" />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                    }}
                >
                    <Bars3CenterLeftIcon
                        size={30}
                        strokeWidth={2}
                        color="white"
                    />
                    <Text
                        style={{
                            color: "white",
                            fontSize: 30,
                            fontWeight: "bold",
                        }}
                    >
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Search")}
                    >
                        <MagnifyingGlassIcon
                            size={30}
                            strokeWidth={2}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                >
                    {/* CARROSEL */}
                    {trending.length > 0 && <TrendingMovies data={trending} />}

                    {/* Movies */}
                    <MovieList title="Upcoming" data={upcoming} />

                    {/* Top rated */}
                    <MovieList title="Top Rated" data={topRated} />
                </ScrollView>
            )}
        </View>
    );
};
