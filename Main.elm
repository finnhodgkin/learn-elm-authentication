port module Main exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)
import Http exposing (..)
import Json.Decode as JD exposing (..)
import Json.Encode as JE exposing (..)


main : Program (Maybe String) Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { username : String
    , password : String
    , token : String
    , message : String
    , log : String
    }


init : Maybe String -> ( Model, Cmd Msg )
init token =
    case token of
        Just token ->
            Model "" "" token "" "" ! [ validateToken token ]

        Nothing ->
            Model "" "" "" "" "" ! []


type alias Creds =
    { username : String, password : String }


type Msg
    = Login
    | Request Creds
    | UpdateUser String
    | UpdatePassword String
    | Register
    | LoggedIn (Result Error String)
    | Verified (Result Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Login ->
            model ! [ authUserCmd model "/login" ]

        Request credentials ->
            model ! []

        UpdateUser username ->
            { model | username = username } ! []

        UpdatePassword password ->
            { model | password = password } ! []

        Register ->
            model ! [ authUserCmd model "/register" ]

        LoggedIn response ->
            getResponse model response

        Verified response ->
            verifyToken model response


getResponse : Model -> Result Http.Error String -> ( Model, Cmd Msg )
getResponse model response =
    case response of
        Ok result ->
            { model | token = result, log = "LOGGED IN WOOP" } ! [ validateToken result ]

        Err error ->
            { model | log = "BAD" } ! []


verifyToken model response =
    case response of
        Ok result ->
            { model | log = "VALIDATED" } ! []

        Err error ->
            { model | log = "BAD" } ! []


userEncoder : Model -> JE.Value
userEncoder model =
    JE.object
        [ ( "username", JE.string model.username )
        , ( "password", JE.string model.password )
        ]


authUser : Model -> String -> Http.Request String
authUser model apiUrl =
    let
        body =
            model
                |> userEncoder
                |> Http.jsonBody
    in
    Http.post apiUrl body tokenDecoder


authUserCmd : Model -> String -> Cmd Msg
authUserCmd model apiUrl =
    authUser model apiUrl
        |> Http.send LoggedIn


tokenDecoder : Decoder String
tokenDecoder =
    JD.field "auth" JD.string


validateToken : String -> Cmd Msg
validateToken token =
    let
        body =
            JE.object [ ( "token", JE.string token ) ]
                |> Http.jsonBody
    in
    Http.send Verified (Http.post "/validate" body tokenDecoder)


view : Model -> Html Msg
view model =
    div []
        [ text model.log
        , Html.form []
            [ div [ class "mv3" ]
                [ label [ class "fw7 f6", for "username" ]
                    [ text "Username" ]
                , input [ onInput UpdateUser, HA.value model.username, class "db w-100 pa2 mt2 br2 b--black-20 ba f6", id "username", placeholder "Username", type_ "text" ]
                    []
                ]
            , div [ class "mv3" ]
                [ label [ class "fw7 f6", for "password" ]
                    [ text "Password" ]
                , input [ onInput UpdatePassword, HA.value model.password, class "db w-100 pa2 mt2 br2 b--black-20 ba f6", id "password", placeholder "Password", type_ "password" ]
                    []
                ]
            , button [ HA.type_ "button", onClick Register, class "pointer br2 ba b--black-20 bg-white pa2 ml1 mv1 bg-animate hover-bg-light-gray f6" ]
                [ text "Register" ]
            , button [ HA.type_ "button", onClick Login, class "pointer br2 ba b--black-20 bg-white pa2 ml1 mv1 bg-animate hover-bg-light-gray f6" ]
                [ text "Log in" ]
            ]
        ]


subscriptions : b -> Sub Msg
subscriptions =
    always Sub.none
