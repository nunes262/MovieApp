import {
    View,
    Text,
    Dimensions,
    TextInput,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LanguageIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import debounce from "lodash/debounce";
import { fetchSearchMovies, image185 } from "../api/moviedb";

const { height, width } = Dimensions.get("window");
export default function SearchScreen() {
    let MovieName = "Kung Fu Panda 4";
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value) => {
        if (value && value.length > 2) {
            setLoading(true);
            fetchSearchMovies({
                query: value,
                include_adult: true,
                Language: "en-US",
                page: "1",
            }).then((data) => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            });
        } else {
            setLoading(false);
            setResults([]);
        }
    };

    const handleTextDebouce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView style={{ backgroundColor: "#262626", height: height }}>
            <View
                style={{
                    marginHorizontal: 20,
                    marginBottom: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#737373",
                    borderRadius: "100%",
                }}
            >
                <TextInput
                    onChangeText={handleTextDebouce}
                    placeholder="Search Movie"
                    placeholderTextColor={"lightgray"}
                    style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                        flex: 1,
                        fontWeight: "600",
                        color: "white",
                    }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    style={{
                        padding: 3,
                        backgroundColor: "#737373",
                        borderRadius: 50,
                        marginRight: 2,
                    }}
                >
                    <XMarkIcon size={"25"} color="white" />
                </TouchableOpacity>
            </View>

            {/* results */}
            {loading ? (
                <Loading />
            ) : results.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "600",
                            marginLeft: 2,
                        }}
                    >
                        Results ({results.length})
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        {results.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() =>
                                        navigation.navigate("Movie", item)
                                    }
                                >
                                    <View style={{ gap: 10, marginBottom: 10 }}>
                                        <Image
                                            /* source={require("../assets/Poster2.jpg")} */
                                            source={{
                                                uri: image185(
                                                    item?.poster_path
                                                ),
                                            }}
                                            style={{
                                                width: width * 0.44,
                                                height: height * 0.3,
                                                borderRadius: 20,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                color: "#D4D4D4",
                                            }}
                                        >
                                            {item?.title &&
                                            item?.title.length > 15
                                                ? item?.title.slice(0, 15) +
                                                  "..."
                                                : item?.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Image source={require("../assets/movieTime.png")} />
                </View>
            )}
        </SafeAreaView>
    );
}
