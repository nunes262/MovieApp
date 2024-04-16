import {
    View,
    Text,
    Dimensions,
    Platform,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/loading";
import {
    fechtPersonDetails,
    fetchPersonsMovies,
    image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [personMovies, setPersonMovie] = useState([]);
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonsDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonsDetails = async (id) => {
        const data = await fechtPersonDetails(id);
        if (data) setPerson(data);
        setLoading(false);
    };

    const getPersonMovies = async (id) => {
        const data = await fetchPersonsMovies(id);
        if (data && data.cast) setPersonMovie(data.cast);
        setLoading(false);
    };

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
                minHeight: height,
                backgroundColor: "#171717",
            }}
        >
            <SafeAreaView
                style={{
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

            {/* Person details */}
            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            shadowColor: "gray",
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                borderRadius: 150,
                                overflow: "hidden",
                                height: 300,
                                width: 300,
                                borderWidth: 2,
                                borderColor: "#737373",
                            }}
                        >
                            <Image
                                source={{ uri: image342(person?.profile_path) }}
                                /* source={require("../assets/jack-black.webp")} */
                                style={{
                                    height: height * 0.43,
                                    width: width * 0.75,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20, gap: 2 }}>
                        <Text
                            style={{
                                fontSize: 40,
                                color: "white",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {person.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#737373",
                                textAlign: "center",
                            }}
                        >
                            {person?.place_of_birth}
                        </Text>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 20,
                            marginTop: 20,
                            margin: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#404040",
                            borderRadius: 100,
                            padding: 16,
                        }}
                    >
                        <View
                            style={{
                                borderRightWidth: 1,
                                borderColor: "#A3A3A3",
                                paddingHorizontal: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>
                                Gender
                            </Text>
                            <Text style={{ color: "#D4D4D4", fontSize: 16 }}>
                                {person?.gender === 1 ? "Female" : "Male"}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRightWidth: 1,
                                borderColor: "#A3A3A3",
                                paddingHorizontal: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>
                                Birthday
                            </Text>
                            <Text style={{ color: "#D4D4D4", fontSize: 16 }}>
                                {person?.birthday}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderRightWidth: 1,
                                borderColor: "#A3A3A3",
                                paddingHorizontal: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>
                                Know for
                            </Text>
                            <Text style={{ color: "#D4D4D4", fontSize: 16 }}>
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "600" }}>
                                Popularity
                            </Text>
                            <Text style={{ color: "#D4D4D4", fontSize: 16 }}>
                                {person?.popularity} %
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            marginVertical: 15,
                            marginHorizontal: 20,
                            gap: 4,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "600",
                                fontSize: 24,
                            }}
                        >
                            Biography
                        </Text>
                        <Text
                            style={{ color: "#A3A3A3", textAlign: "justify" }}
                        >
                            {person?.biography || "No biography available"}
                        </Text>
                    </View>

                    <MovieList
                        title={"Movies"}
                        data={personMovies}
                        hideSeeAll={true}
                    />
                </View>
            )}
        </ScrollView>
    );
}
