import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../themes";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/loading";
import {
    fetchMovieCredits,
    fetchMovieDeails,
    fetchSimilarMovies,
    image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavorite, setIsFavorite] = useState(false);
    const [cast, setCast] = useState([]);
    const [SimilarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMoviesCredit(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async (id) => {
        const data = await fetchMovieDeails(id);
        if (data) setMovie(data);
        setLoading(false);
    };

    const getMoviesCredit = async (id) => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    };

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilarMovies(data.results);
    };
    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
                minHeight: height,
                backgroundColor: "#171717",
            }}
        >
            <View style={{ width: "100%" }}>
                <SafeAreaView
                    style={{
                        position: "absolute",
                        zIndex: 20,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            backgroundColor: "#eab308",
                            borderRadius: 12,
                            padding: 5,
                        }}
                    >
                        <ChevronLeftIcon
                            size={28}
                            strokeWidth={2.5}
                            color={"white"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 5,
                        }}
                    >
                        <HeartIcon
                            onPress={() => setIsFavorite(!isFavorite)}
                            size={28}
                            strokeWidth={2.5}
                            color={isFavorite ? theme.background : "white"}
                        />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <View>
                            <Image
                                source={{ uri: image500(movie?.poster_path) }}
                                /* source={require("../assets/Poster2.jpg")} */
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={[
                                    "transparent",
                                    "rgba(23,23,23,0.8)",
                                    "rgba(23,23,23,1)",
                                ]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{
                                    width,
                                    height: height * 0.4,
                                    position: "absolute",
                                    bottom: 0,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: -30,
                                gap: 15,
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: 20,
                                    color: "#fff",
                                    textAlign: "center",
                                    fontSize: 35,
                                    fontWeight: "bold",
                                }}
                            >
                                {movie?.title}
                            </Text>
                            {movie?.id ? (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#D4D4D4",
                                        fontSize: 16,
                                        fontWeight: "600",
                                    }}
                                >
                                    {movie?.status} •{" "}
                                    {movie?.release_date?.split("-")[0]} •{" "}
                                    {movie?.runtime} min
                                </Text>
                            ) : null}

                            {/* Genres */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    gap: 10,
                                }}
                            >
                                {movie?.genres?.map((genre, index) => {
                                    let showDot =
                                        index + 1 != movie.genres.length;
                                    return (
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                color: "#D4D4D4",
                                                fontSize: 16,
                                                fontWeight: "600",
                                            }}
                                        >
                                            {genre?.name} {showDot ? "•" : null}
                                        </Text>
                                    );
                                })}
                            </View>

                            {/* DEscription */}
                            <Text
                                style={{
                                    color: "#D4D4D4",
                                    fontSize: 16,
                                    margin: 10,
                                    letterSpacing: 1,
                                    textAlign: "justify",
                                }}
                            >
                                {movie?.overview}
                            </Text>
                        </View>
                        {/* Cast */}
                        {cast.length > 0 && (
                            <Cast cast={cast} navigation={navigation} />
                        )}

                        {/* Similar movies */}

                        {SimilarMovies.length > 0 && (
                            <MovieList
                                data={SimilarMovies}
                                title={"Similar Movies"}
                                hideSeeAll={true}
                            />
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
}

/* Comédia  */
